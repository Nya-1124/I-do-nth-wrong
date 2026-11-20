import { boss } from "./stories/boss.js";
import { family } from "./stories/family.js";
import { girlfriend } from "./stories/girlfriend.js";

export const meta = {
  title: "我冇做錯",
  lede: "三個人，同一句唔肯講明嘅話。你揀邊句，先算冇錯。",
  disclaimer: "虛構諷刺短劇，唔係感情、家庭或者職場忠告。",
  contentNote: "對白誇張。唔舒服可以隨時關閉。",
  loopNote: "有啲選擇會將對話拉返去舊問題。唔係壞咗。",
};

export const characters = [girlfriend.character, family.character, boss.character];

export const nodes = {
  ...girlfriend.nodes,
  ...family.nodes,
  ...boss.nodes,
};

export function getCharacter(id) {
  return characters.find((character) => character.id === id) ?? null;
}

export function getNode(id) {
  return nodes[id] ?? null;
}
