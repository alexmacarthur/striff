import { Character } from "../types";

let toCharacters = (str: string): Character[] =>
  str.split("").map((char: string, index: number) => {
    return {
      value: char,
      index,
      ref: Symbol(char),
      pointsTo: null,
    };
  });

export default toCharacters;
