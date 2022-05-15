import { Character } from "../types";

/**
 * From left -> right, slice a string into every
 * possible combination.
 */
let getAllParts = (strArray: Character[]): Character[][] => {
  let allParts = [];

  for (let i = 0; i < strArray.length; i++) {
    let parts = strArray
      .map((_char, index) => strArray.slice(i, index + 1))
      .filter((part) => part.length);

    allParts.push(parts);
  }

  return allParts.flat();
};

export default getAllParts;
