import { Character } from "../types";

let fromCharacters = (characters: Character[]): string => {
  return characters.map((c: Character) => c.value).join("");
};

export default fromCharacters;
