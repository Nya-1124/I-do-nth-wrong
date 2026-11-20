import { characters, getCharacter, getNode, meta } from "./story.js";

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function titleFor(session) {
  if (session.screen !== "chat" || !session.characterId) return meta.title;
  const character = getCharacter(session.characterId);
  return character ? `${character.name} · ${meta.title}` : meta.title;
}

function messageHtml(line) {
  if (line.type === "loop") {
    return `<div class="loop-chip" role="status">對話打圈，返到舊問題</div>`;
  }
  const text = escapeHtml(line.text);
  if (line.speaker === "narrator") return `<p class="narrator">${text}</p>`;
  if (line.speaker === "me") return `<div class="bubble me"><p>${text}</p></div>`;
  return `<div class="bubble them"><p>${text}</p></div>`;
}

function selectScreen() {
  const cards = characters.map((character) => `
    <button class="cast-card tone-${character.tone}" type="button" data-action="select" data-id="${escapeHtml(character.id)}" aria-label="開始：${escapeHtml(character.name)}，${escapeHtml(character.role)}">
      <span class="avatar" aria-hidden="true">${escapeHtml(character.initial)}</span>
      <span class="cast-copy">
        <span class="cast-name">${escapeHtml(character.name)}<small>${escapeHtml(character.role)}</small></span>
        <span class="hook">「${escapeHtml(character.hook)}」</span>
        <span class="premise">${escapeHtml(character.premise)}</span>
      </span>
    </button>`).join("");

  return `
    <main class="screen select-screen">
      <div class="masthead">
        <p class="seal" aria-hidden="true">虛構</p>
        <div>
          <h1>${escapeHtml(meta.title)}</h1>
          <p class="lede">${escapeHtml(meta.lede)}</p>
        </div>
      </div>
      <div class="cast">${cards}</div>
      <p class="fine">${escapeHtml(meta.loopNote)}</p>
      <p class="fine">${escapeHtml(meta.contentNote)}</p>
      <p class="disclaimer">${escapeHtml(meta.disclaimer)}</p>
    </main>`;
}

function resultCard(node) {
  const kicker = node.ending === "success" ? "守住界線" : "界線鬆咗";
  return `
    <article class="result result-${node.ending}">
      <p class="kicker">${kicker}</p>
      <h2>${escapeHtml(node.title)}</h2>
    </article>`;
}

function choiceDock(node) {
  const buttons = (node?.choices ?? []).map((choice, index) => `
    <button class="choice" type="button" data-action="choose" data-id="${escapeHtml(choice.id)}">
      <span class="choice-index" aria-hidden="true">${index + 1}</span>
      <span class="choice-text">${escapeHtml(choice.text)}</span>
    </button>`).join("");
  return `
    <div class="dock">
      <p class="dock-label">你點回</p>
      ${buttons}
    </div>`;
}

function endingDock() {
  return `
    <div class="dock">
      <button class="btn-primary" type="button" data-action="restart">再嚟一次</button>
      <button class="btn-secondary" type="button" data-action="switch">換一個人</button>
    </div>`;
}

function confirmDock(session, character) {
  const copy = session.confirm === "restart"
    ? "呢段由頭開始？頭先揀過嘅會清走。"
    : `離開${character.name}，去揀第二個人？`;
  const confirmLabel = session.confirm === "restart" ? "由頭開始" : "去揀人";
  return `
    <div class="dock confirm-dock">
      <p class="confirm-copy">${escapeHtml(copy)}</p>
      <button class="btn-primary" type="button" data-action="confirm">${confirmLabel}</button>
      <button class="btn-secondary" type="button" data-action="cancel">繼續傾</button>
    </div>`;
}

function chatScreen(session) {
  const character = getCharacter(session.characterId);
  const node = getNode(session.nodeId);
  const dock = session.confirm
    ? confirmDock(session, character)
    : node?.ending
      ? endingDock()
      : choiceDock(node);
  const result = node?.ending ? resultCard(node) : "";
  return `
    <main class="screen chat-screen tone-${character.tone}" data-screen="chat">
      <header class="chat-top">
        <button class="ghost" type="button" data-action="ask-switch">換人</button>
        <div class="who">
          <strong>${escapeHtml(character.name)}</strong>
          <small>${escapeHtml(character.role)}</small>
        </div>
        <button class="ghost" type="button" data-action="ask-restart">重嚟</button>
      </header>
      <p class="disclaimer bar">${escapeHtml(meta.disclaimer)}</p>
      <div class="log" id="log" role="log" aria-live="polite" aria-relevant="additions">
        ${session.transcript.map((line) => messageHtml(line)).join("")}
        ${result}
      </div>
      ${dock}
    </main>`;
}

export function render(session) {
  if (session.screen === "chat" && session.characterId) return chatScreen(session);
  return selectScreen();
}
