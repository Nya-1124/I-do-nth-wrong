export const them = (text) => ({ speaker: "them", text });
export const narr = (text) => ({ speaker: "narrator", text });

export function choice(id, kind, text, next, reaction) {
  return { id, kind, text, next, reaction };
}

export function question(id, characterId, lines, choices) {
  return [id, { id, characterId, lines, choices }];
}

export function ending(id, characterId, endingType, title, lines) {
  return [id, { id, characterId, ending: endingType, title, lines }];
}
