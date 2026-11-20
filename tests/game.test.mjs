import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  cancelConfirm,
  confirmPending,
  createSession,
  pickChoice,
  requestRestart,
  requestSwitch,
  restartNow,
  selectCharacter,
  switchNow,
} from "../site/js/engine.js";
import { characters, getCharacter, meta, nodes } from "../site/js/story.js";
import { render, titleFor } from "../site/js/view.js";

const banned = /[这说对吗么们国时样发过还进头问现经长从两无应东车门爱点业会开为与书听说让给错体没]/u;
const kinds = new Set(["boundary", "loop", "fall"]);

function questionsFor(characterId) {
  return Object.values(nodes).filter((node) => node.characterId === characterId && !node.ending);
}

function forwardDistance(startId) {
  const dist = new Map([[startId, 0]]);
  const queue = [startId];
  while (queue.length) {
    const id = queue.shift();
    const node = nodes[id];
    if (!node.choices) continue;
    for (const choice of node.choices) {
      if (choice.kind === "loop" || dist.has(choice.next)) continue;
      dist.set(choice.next, dist.get(id) + 1);
      queue.push(choice.next);
    }
  }
  return dist;
}

function boundaryPath(startId) {
  const path = [];
  const seen = new Set();
  let id = startId;
  while (!seen.has(id)) {
    seen.add(id);
    path.push(id);
    const node = nodes[id];
    if (node.ending) break;
    const boundary = node.choices.filter((choice) => choice.kind === "boundary");
    assert.equal(boundary.length, 1, `${id} 應該得一條界線`);
    id = boundary[0].next;
  }
  assert.equal(nodes[path.at(-1)].ending, "success", `${startId} 嘅界線行唔到成功`);
  return path;
}

function reachableFrom(startId) {
  const seen = new Set();
  const queue = [startId];
  while (queue.length) {
    const id = queue.shift();
    if (seen.has(id)) continue;
    seen.add(id);
    const node = nodes[id];
    for (const choice of node.choices ?? []) {
      if (!seen.has(choice.next)) queue.push(choice.next);
    }
  }
  return seen;
}

function canReachSuccess(startId) {
  const seen = new Set();
  const stack = [startId];
  while (stack.length) {
    const id = stack.pop();
    if (seen.has(id)) continue;
    seen.add(id);
    const node = nodes[id];
    if (node.ending === "success") return true;
    if (node.ending) continue;
    for (const choice of node.choices) stack.push(choice.next);
  }
  return false;
}

function playBoundary(session) {
  let current = session;
  const guard = new Set();
  while (!nodes[current.nodeId].ending) {
    assert.equal(guard.has(current.nodeId), false, `${current.nodeId} 界線打圈`);
    guard.add(current.nodeId);
    const boundary = nodes[current.nodeId].choices.find((choice) => choice.kind === "boundary");
    current = pickChoice(current, boundary.id);
  }
  return current;
}

function firstFallToQuestion(session) {
  return nodes[session.nodeId].choices.find((choice) => choice.kind === "fall" && nodes[choice.next].choices);
}

function pathToEnding(startId, endingType) {
  const queue = [[]];
  const seen = new Set([startId]);
  while (queue.length) {
    const path = queue.shift();
    const nodeId = path.length ? path.at(-1).next : startId;
    const node = nodes[nodeId];
    if (node.ending === endingType) return path;
    if (node.ending) continue;
    for (const choice of node.choices) {
      if (seen.has(choice.next)) continue;
      seen.add(choice.next);
      queue.push([...path, choice]);
    }
  }
  return null;
}

test("three characters, one shared disclaimer", () => {
  assert.deepEqual(characters.map((character) => character.id), ["girlfriend", "family", "boss"]);
  assert.match(meta.disclaimer, /虛構/);
  assert.match(meta.disclaimer, /唔係/);
  assert.equal(banned.test(meta.disclaimer), false);
});

test("choice graph is closed, branching, and Cantonese", () => {
  const ids = new Set();
  for (const [key, node] of Object.entries(nodes)) {
    assert.equal(key, node.id);
    assert.equal(banned.test(JSON.stringify(node)), false, node.id);
    for (const line of node.lines) {
      assert.ok(line.text.trim(), node.id);
      assert.match(line.text, /\p{Script=Han}/u);
      assert.ok(line.speaker === "them" || line.speaker === "narrator");
    }
    if (node.ending) {
      assert.ok(node.ending === "success" || node.ending === "fail");
      assert.ok(node.title.trim());
      assert.equal(node.choices, undefined);
      continue;
    }
    assert.equal(node.choices.length, 4, node.id);
    assert.equal(node.lines.some((line) => line.speaker === "them"), true, node.id);
    const boundary = node.choices.filter((choice) => choice.kind === "boundary");
    assert.equal(boundary.length, 1, node.id);
    for (const choice of node.choices) {
      assert.equal(ids.has(choice.id), false, choice.id);
      ids.add(choice.id);
      assert.ok(kinds.has(choice.kind), choice.id);
      assert.ok(choice.text.trim());
      assert.ok([...choice.text].length <= 24, choice.text);
      assert.ok(choice.reaction.length >= 1, choice.id);
      assert.ok(nodes[choice.next], `${choice.id} -> ${choice.next}`);
      assert.equal(nodes[choice.next].characterId, node.characterId);
      if (choice.kind === "loop") {
        const speakers = new Set(choice.reaction.map((line) => line.speaker));
        assert.equal(speakers.has("them"), true, choice.id);
        assert.equal(speakers.has("narrator"), true, choice.id);
        const narrator = choice.reaction.filter((line) => line.speaker === "narrator").map((line) => line.text).join("");
        assert.match(narrator, /返/, choice.id);
      }
    }
  }
});

test("each route can hold a boundary, loop to an earlier question, and fail", () => {
  for (const character of characters) {
    const questions = questionsFor(character.id);
    assert.ok(questions.length >= 8, character.id);
    const dist = forwardDistance(character.start);
    const main = boundaryPath(character.start).filter((id) => !nodes[id].ending);
    assert.ok(main.length >= 6, character.id);
    const reachable = reachableFrom(character.start);
    const loops = [];
    let continued = 0;
    for (const node of Object.values(nodes).filter((item) => item.characterId === character.id)) {
      assert.equal(reachable.has(node.id), true, node.id);
      assert.equal(dist.has(node.id), true, `${node.id} 只可以靠打圈先到`);
      if (!node.choices) {
        if (node.ending === "fail") assert.equal(canReachSuccess(node.id), false);
        continue;
      }
      assert.equal(canReachSuccess(node.id), true, node.id);
      const ownBoundary = boundaryPath(node.id);
      assert.equal(nodes[ownBoundary.at(-1)].ending, "success");
      for (const choice of node.choices) {
        if (choice.kind === "fall" && nodes[choice.next].choices) continued += 1;
        if (choice.kind !== "loop") continue;
        loops.push(choice);
        assert.equal(nodes[choice.next].ending, undefined);
        assert.ok(dist.get(choice.next) < dist.get(node.id), `${choice.id} ${dist.get(node.id)} -> ${dist.get(choice.next)}`);
      }
    }
    assert.ok(loops.length >= 3, character.id);
    assert.ok(new Set(loops.map((choice) => choice.next)).size >= 2, character.id);
    assert.ok(loops.some((choice) => main.includes(choice.next)), character.id);
    assert.ok(continued >= 2, character.id);
    const endings = Object.values(nodes).filter((node) => node.characterId === character.id && node.ending);
    assert.equal(endings.filter((node) => node.ending === "success").length, 1);
    assert.ok(endings.filter((node) => node.ending === "fail").length >= 3);
    assert.match(JSON.stringify(nodes), /唔/);
    assert.match(character.scene + character.premise, /唔|嘅|咗|喺|佢/);
  }
});

test("engine plays the boundary, a loop, a side door, and a restart", () => {
  for (const character of characters) {
    let session = selectCharacter(createSession(), character.id);
    assert.equal(session.nodeId, character.start);
    assert.equal(session.transcript.filter((line) => line.text === character.scene).length, 1);

    const loopHunt = (() => {
      let current = session;
      const seen = new Set();
      while (!seen.has(current.nodeId)) {
        seen.add(current.nodeId);
        const loop = nodes[current.nodeId].choices.find((choice) => choice.kind === "loop");
        if (loop) return { current, loop };
        current = pickChoice(current, nodes[current.nodeId].choices.find((choice) => choice.kind === "boundary").id);
      }
      return null;
    })();
    assert.ok(loopHunt, character.id);
    const question = nodes[loopHunt.loop.next].lines.find((line) => line.speaker === "them").text;
    const before = loopHunt.current.transcript.filter((line) => line.text === question).length;
    session = pickChoice(loopHunt.current, loopHunt.loop.id);
    assert.equal(session.nodeId, loopHunt.loop.next);
    assert.equal(session.transcript.filter((line) => line.type === "loop").length, 1);
    assert.ok(session.transcript.filter((line) => line.text === question).length > before);
    assert.equal(session.transcript.filter((line) => line.text === character.scene).length, 1);
    session = playBoundary(session);
    assert.equal(nodes[session.nodeId].ending, "success");

    session = selectCharacter(createSession(), character.id);
    const side = firstFallToQuestion(session);
    session = playBoundary(pickChoice(session, side.id));
    assert.equal(nodes[session.nodeId].ending, "success");

    const failPath = pathToEnding(character.start, "fail");
    assert.ok(failPath?.length, character.id);
    session = selectCharacter(createSession(), character.id);
    for (const choice of failPath) session = pickChoice(session, choice.id);
    assert.equal(nodes[session.nodeId].ending, "fail");
    session = playBoundary(restartNow(session));
    assert.equal(nodes[session.nodeId].ending, "success");
    assert.equal(switchNow().screen, "select");
  }
});

test("confirm restart and switch, and the screen does not spoil the kind", () => {
  let session = selectCharacter(createSession(), "girlfriend");
  const nodeId = session.nodeId;
  session = requestRestart(session);
  assert.equal(session.confirm, "restart");
  assert.match(render(session), /由頭開始/);
  assert.match(render(session), /繼續傾/);
  session = cancelConfirm(session);
  assert.equal(session.confirm, null);
  assert.equal(session.nodeId, nodeId);
  session = confirmPending(requestSwitch(session));
  assert.equal(session.screen, "select");

  session = selectCharacter(createSession(), "boss");
  session = confirmPending(requestRestart(session));
  assert.equal(session.nodeId, "bs-1");
  assert.equal(session.transcript.filter((line) => line.speaker === "me").length, 0);

  const selectHtml = render(createSession());
  assert.match(selectHtml, /阿澄/);
  assert.match(selectHtml, /媽咪/);
  assert.match(selectHtml, /陳生/);
  assert.match(selectHtml, new RegExp(meta.disclaimer));
  assert.match(selectHtml, /深水埗/);
  assert.doesNotMatch(selectHtml, /boundary|data-kind/);

  session = selectCharacter(createSession(), "family");
  const chatHtml = render(session);
  assert.match(chatHtml, /你點回/);
  assert.equal(chatHtml.match(/data-action="choose"/g).length, 4);
  assert.match(chatHtml, new RegExp(meta.disclaimer));
  assert.equal(titleFor(session), "媽咪 · 我冇做錯");
  session = playBoundary(session);
  const endHtml = render(session);
  assert.match(endHtml, /群組你自己回/);
  assert.match(endHtml, /再嚟一次/);
  assert.match(endHtml, /換一個人/);
  assert.match(endHtml, /守住界線/);
  assert.doesNotMatch(endHtml, /boundary|data-kind|localStorage/);
});

test("static site stays relative, offline, and deployable to the repo subpath", () => {
  const html = fs.readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
  const css = fs.readFileSync(new URL("../site/css/styles.css", import.meta.url), "utf8");
  const game = fs.readFileSync(new URL("../site/js/game.js", import.meta.url), "utf8");
  const engine = fs.readFileSync(new URL("../site/js/engine.js", import.meta.url), "utf8");
  const view = fs.readFileSync(new URL("../site/js/view.js", import.meta.url), "utf8");
  const pages = fs.readFileSync(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8");
  const ci = fs.readFileSync(new URL("../.github/workflows/test.yml", import.meta.url), "utf8");

  assert.match(html, /lang="zh-Hant-HK"/);
  assert.match(html, /viewport-fit=cover/);
  assert.match(html, /href="\.\/css\/styles\.css"/);
  assert.match(html, /src="\.\/js\/game\.js"/);
  assert.doesNotMatch(html, /(?:href|src)="\/(?!\/)/);
  assert.doesNotMatch(html, /https?:\/\//);
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /safe-area-inset-top/);
  assert.match(css, /overflow-x:\s*hidden/);
  assert.match(css, /100dvh/);
  assert.match(css, /min-height:\s*56px/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.doesNotMatch(css, /https?:\/\//);
  assert.doesNotMatch(`${game}\n${engine}\n${view}`, /localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon|gtag/);
  assert.match(pages, /upload-pages-artifact/);
  assert.match(pages, /path:\s*site/);
  assert.match(pages, /branches:\s*\[main\]/);
  assert.match(ci, /node --test tests\/game\.test\.mjs/);
  assert.equal(fs.existsSync(new URL("../site/.nojekyll", import.meta.url)), true);
});
