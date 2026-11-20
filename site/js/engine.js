import { getCharacter, getNode } from "./story.js";

export function createSession() {
  return {
    screen: "select",
    characterId: null,
    nodeId: null,
    transcript: [],
    confirm: null,
  };
}

function appendNode(session, nodeId, { loop }) {
  const node = getNode(nodeId);
  if (!node) {
    throw new Error(`搵唔到節點 ${nodeId}`);
  }
  const extra = [];
  if (loop) extra.push({ type: "loop" });
  extra.push(...node.lines.map((line) => ({ ...line })));
  return {
    ...session,
    screen: "chat",
    nodeId,
    confirm: null,
    transcript: [...session.transcript, ...extra],
  };
}

export function selectCharacter(session, characterId) {
  const character = getCharacter(characterId);
  if (!character) return session;
  const base = {
    screen: "chat",
    characterId,
    nodeId: null,
    confirm: null,
    transcript: [{ speaker: "narrator", text: character.scene }],
  };
  return appendNode(base, character.start, { loop: false });
}

export function pickChoice(session, choiceId) {
  if (session.screen !== "chat" || session.confirm) return session;
  const node = getNode(session.nodeId);
  if (!node?.choices) return session;
  const picked = node.choices.find((choice) => choice.id === choiceId);
  if (!picked) return session;
  const withReply = {
    ...session,
    transcript: [
      ...session.transcript,
      { speaker: "me", text: picked.text },
      ...picked.reaction.map((line) => ({ ...line })),
    ],
  };
  return appendNode(withReply, picked.next, { loop: picked.kind === "loop" });
}

export function requestRestart(session) {
  if (session.screen !== "chat") return session;
  return { ...session, confirm: session.confirm === "restart" ? null : "restart" };
}

export function requestSwitch(session) {
  if (session.screen !== "chat") return session;
  return { ...session, confirm: session.confirm === "switch" ? null : "switch" };
}

export function cancelConfirm(session) {
  if (!session.confirm) return session;
  return { ...session, confirm: null };
}

export function restartNow(session) {
  if (!session.characterId) return session;
  return selectCharacter(createSession(), session.characterId);
}

export function switchNow() {
  return createSession();
}

export function confirmPending(session) {
  if (session.confirm === "restart") return restartNow(session);
  if (session.confirm === "switch") return switchNow();
  return session;
}
