import { DiffResult, Character } from "./types";
import deleteRef from "./utils/deleteRef";
import fromCharacters from "./utils/fromCharacters";
import getAllParts from "./utils/getAllParts";
import toCharacters from "./utils/toCharacters";

let getDiff = (partsArr: Character[][], arr1: Character[], arr2: Character[]) => {
  let str2 = fromCharacters(arr2);
  let matched = new Map<Symbol | null, string>();
  let matchedIndicies: { [key: string]: number } = {};

  // For each slice of the first string, attempt to match
  // it in the second string.
  partsArr.forEach((part: Character[]) => {
    let partString = fromCharacters(part);

    // One day, `RegExp.replace` will hopefully be built-in.
    let pattern = new RegExp(partString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    // If this slice of text matches ANY part of the string, it's in.
    let result = pattern.exec(str2);
    let resultIndex = result?.index;
    let pastMatchLength = matchedIndicies[resultIndex ?? ""] || 0;

    // Give matched strings of longer length over all others.
    if (result && (partString.length > pastMatchLength)) {
      matchedIndicies[resultIndex as number] = partString.length;

      // Since this is matched, I can safely update the second
      // string with symbol references.
      part.forEach((partItem, index) => {
        let characterIndex = (resultIndex as number) + index;
        let originalItem = arr1[partItem.index];

        // The first string character has already been matched
        // with a second string character. Something's up.
        // if (
        //   originalItem.pointsTo &&
        //   originalItem.pointsTo !== arr2[characterIndex].ref
        // ) {
        //   console.log('This one\'s already been matched to something, bud:', partItem.value);
        // }

        // Create a two-way binding between the characters:
        // Point the first string character to the second's ref.
        originalItem.pointsTo = arr2[characterIndex].ref;
        arr2[characterIndex].pointsTo = partItem.ref;
      });

      // At this point, it's possible that other parts
      // already matched the string and had their items set to the
      // `matched` store. We need to find those indicies and unset them.
      for (let i = result.index; i < result.index + pastMatchLength; i++) {
        matched.delete(arr1[i].ref);
      }

      // Throw each of the matched characters into storage.
      // These will always be from the FIRST string.
      part.forEach((char) => matched.set(char.ref, char.value));
    }
  });

  // Search through our matched items for an item by this ref.
  let hasNoMatchingRef = (char: Character, property: keyof Character) =>
    !matched.get(char[property] as any);

  return {
    // First string characters NOT in the "matched" set.
    removed: arr1
      .filter((char: Character) => hasNoMatchingRef(char, "ref"))
      .map(deleteRef),

    // Second string characters NOT in the "matched" set.
    // Since the matched collection will only contain the refs of the
    // first string, we need to search by 'pointsTo' here.
    added: arr2
      .filter((char: Character) => hasNoMatchingRef(char, "pointsTo"))
      .map(deleteRef),
  };
};

let striff = (str1: string, str2: string): DiffResult => {
  let strArr1 = toCharacters(str1);

  let strArr2 = toCharacters(str2).map((char, index) => {
    let str1Char = strArr1[index];

    // If the character value matches in the first string,
    // point this character & that character to the same ref.
    if (str1Char?.value === char.value) {
      char.pointsTo = str1Char.ref;
    }

    return char;
  });

  return getDiff(
    getAllParts(strArr1),
    strArr1,
    strArr2
  );
};

export default striff;
