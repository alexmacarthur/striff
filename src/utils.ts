import { FilledString } from "./types";

const split = (str: string): string[] => str.split("");

interface LatestEmptyMatchingIndexParams {
  initialIndex: number;
  arr1: string[];
  arr2: string[];
  character: string;
}

const latestEmptyMatchingIndex = ({
  initialIndex,
  arr1,
  arr2,
  character,
}: LatestEmptyMatchingIndexParams): number => {
  if (arr1[initialIndex] !== character) {
    return -1;
  }

  let nextIndex = initialIndex + 1;
  let nextCharacterIsSame = arr1[nextIndex] === character;
  let nextSearchedCharacterIsDifferent = arr2[nextIndex] !== character;

  // Only continue searching if the next "source" character is the same,
  // AND the next character in the array we're searching is still different.
  // If it's the same, there's no point in continuing to search.
  if (nextCharacterIsSame && nextSearchedCharacterIsDifferent) {
    return latestEmptyMatchingIndex({
      initialIndex: nextIndex,
      arr1,
      arr2,
      character,
    });
  }

  return initialIndex;
};

const shiftedDueToAdditionOrRemoval = (str1: string, str2: string): boolean => {
  let regex = new RegExp(str2);

  return regex.test(str1);
};

/**
 * These parameters of strings MUST be in descending order by length.
 */
const fill = (strs: string[], isFlipped: boolean) => {
  let [str1, str2] = strs;
  let strArr1 = split(str1);
  let strArr2 = split(str2) as FilledString;
  let longestLength = Math.max(str1.length, str2.length);

  for (let i = 0; i < longestLength; i++) {
    let latestIndexMatch = latestEmptyMatchingIndex({
      initialIndex: i,
      arr1: strArr1,
      arr2: strArr2 as string[],
      character: strArr2[i] as string,
    });
    let isSameCharacter = strArr2[i] && strArr1[i] === strArr2[i];
    let isChangedCharacter = strArr2[i] && strArr1[i] !== strArr2[i];

    if (isSameCharacter) {
      if (latestIndexMatch > i && latestIndexMatch - i > 1) {
        let items = new Array(latestIndexMatch - i).fill(null);

        // Necessary for handling strings in which duplicate
        // characters are ADDED or REMOVED.
        //
        // When ADDED, we want the first character be shoved to front.
        // Ex: a b c null null null
        //
        // When REMOVED, we want the first character to be shoved to back.
        // Ex: null null null b c
        let insertIndex = isFlipped ? latestIndexMatch : i;

        strArr2.splice(insertIndex, 0, ...items);

        i = latestIndexMatch;
      }

      continue;
    }

    // In the event that a character simply changed, if no substring shift
    // has occurred (the second string isn't just a part of the first), I'm
    // assuming that the change in character at this position is an actual change,
    // and not just due to characters being added or removed.
    if (!shiftedDueToAdditionOrRemoval(str1, str2) && isChangedCharacter) {
      continue;
    }

    // Set the other string's value at index to this one.
    strArr2.splice(i, 0, null);
  }

  return [strArr1, strArr2];
};

export const fillStrings = (strs: string[]): FilledString[] => {
  let shouldFlip = strs[1].length > strs[0].length;

  if (shouldFlip) {
    strs = [strs[1], strs[0]];
  }

  let filledArrs = fill(strs, shouldFlip);

  return shouldFlip ? [filledArrs[1], filledArrs[0]] : filledArrs;
};
