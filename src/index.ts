import { DiffResult, Character } from "./types";
import deleteRef from "./utils/deleteRef";
import fromCharacters from "./utils/fromCharacters";
import getAllParts from "./utils/getAllParts";
import toCharacters from "./utils/toCharacters";

const getDiff = (partsArr: Character[][], arr1: Character[], arr2: Character[]) => {
  let str2 = fromCharacters(arr2);
  let matched = new Map<Symbol | null, string>();
  let matchedIndicies: {[key: string]: number} = {};

  partsArr.forEach((part: Character[]) => {
    let partString = fromCharacters(part);
    let pattern = new RegExp(partString);

    // If this little thing matches ANY part of the string, it's in.
    let result = pattern.exec(str2);
    let resultIndex = result?.index;
    let pastMatchLength = matchedIndicies[resultIndex ?? ""] || 0;

    // Give matched strings of longer length over all others.
    if (result && (partString.length > pastMatchLength)) {
      matchedIndicies[resultIndex as number] = partString.length;

      // Since this is matched, I can safely update the second
      // string with symbol references.
      part.forEach((partItem, index) => {
        arr2[(resultIndex as number) + index].ref = partItem.ref;
      })

      // At this point, it's possible that other parts
      // already matched the string and had their items set to the
      // `matched` store. We need to find those indicies and unset them.
      for (let i = result.index; i < (result.index + pastMatchLength); i++) {
        let refToReset = arr1[i]?.ref;
        matched.delete(refToReset);
      }

      // Throw each of the matched characters into storage.
      // These will always be from the FIRST string, so each
      // of them will already have a filled `ref`.
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
