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
} from "./engine.js";
import { getNode } from "./story.js";
import { render, titleFor } from "./view.js";

const root = document.querySelector("#app");
let session = createSession();

function draw() {
  root.innerHTML = render(session);
  document.title = titleFor(session);
  const log = root.querySelector("#log");
  if (log) log.scrollTop = log.scrollHeight;
}

root.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target || !root.contains(target)) return;
  const action = target.dataset.action;
  if (action === "select") session = selectCharacter(session, target.dataset.id);
  else if (action === "choose") session = pickChoice(session, target.dataset.id);
  else if (action === "ask-restart") session = requestRestart(session);
  else if (action === "ask-switch") session = requestSwitch(session);
  else if (action === "cancel") session = cancelConfirm(session);
  else if (action === "confirm") session = confirmPending(session);
  else if (action === "restart") session = restartNow(session);
  else if (action === "switch") session = switchNow();
  draw();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && session.confirm) {
    session = cancelConfirm(session);
    draw();
    return;
  }
  if (session.screen !== "chat" || session.confirm) return;
  const index = Number(event.key);
  const node = getNode(session.nodeId);
  if (!node?.choices || index < 1 || index > node.choices.length) return;
  session = pickChoice(session, node.choices[index - 1].id);
  draw();
});

draw();
