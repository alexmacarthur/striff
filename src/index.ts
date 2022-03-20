import { DiffResult, Character } from "./types";
import deleteRef from "./utils/deleteRef";
import getAllParts from "./utils/getAllParts";
import toCharacters from "./utils/toCharacters";

const getDiff = (partsArr: Character[][], arr1: Character[], arr2: Character[]) => {
  let str2 = arr2.map((c: Character) => c.value).join("");
  let matched = new Map<Symbol | null, string>();
  let matchedIndicies: {[key: string]: number} = {};

  partsArr.forEach((part: Character[]) => {
    let partString = part.map((c) => c.value).join("");
    let pattern = new RegExp(partString);

    // If this little thing matches ANY part of the string, it's in.
    let result = pattern.exec(str2);

    // We found a match, so let's spread it into our 'matched' store.
    let pastMatch = matchedIndicies[result?.index || ""];

    // Give matched strings of longer length over all others.
    if (result && (!pastMatch || partString.length > pastMatch)) {
      matchedIndicies[result.index] = partString.length;

      // Since this is matched, I can safely update the second
      // string with symbol references.
      let partIndex = 0;
      for (let i = result.index; i < part.length + result.index; i++) {
        arr2[i].ref = part[partIndex].ref;
        partIndex++;
      }

      // Throw each of the matched characters into storage.
      part.forEach((char) => matched.set(char.ref, char.value));
    }
  });

  let hasNoMatchingRef = (char: Character) => !matched.get(char.ref);

  return {
    // First string characters NOT in the "matched" set.
    removed: arr1.filter(hasNoMatchingRef).map(deleteRef),

    // Second string characters NOT in the "matched" set.
    added: arr2.filter(hasNoMatchingRef).map(deleteRef),
  };
};

const striff = (str1: string, str2: string): DiffResult => {
  let strArr1 = toCharacters(str1, true);
  let strArr2 = toCharacters(str2).map((char, index) => {
    let str1Char = strArr1[index];

    if (str1Char?.value === char.value) {
      char.ref = str1Char.ref;
    }

    return char;
  });

  let parts = getAllParts(strArr1);
  return getDiff(parts, strArr1, strArr2);
};

export default striff;
