import { Character } from "../types";

let toCharacters = (str: string, setRef = false): Character[] => {
  return str.split("").map((char: string, index: number) => {
    return { value: char, index, ref: setRef ? Symbol(char) : null };
  });
};

export default toCharacters;
