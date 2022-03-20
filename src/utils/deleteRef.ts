import { Character, PrunedCharacter } from "../types";

let deleteRef = (char: Partial<Character>) => {
  delete char.ref;

  return char as PrunedCharacter;
};

export default deleteRef;
