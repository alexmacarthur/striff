import { Character } from "../types";

const toCharacters = (arr: string[]): Character[] => {
  return arr.map((c) => {
    return { value: c, accountedFor: false };
  });
};

export default toCharacters;
