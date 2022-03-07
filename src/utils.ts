import { FilledString } from "./types";

const split = (str: string): string[] => str.split("");

/**
 * These parameters of strings MUST be in descending order by length.
 */
const fill = (strs: string[]) => {
  let strArr1 = split(strs[0]) as FilledString;
  let strArr2 = split(strs[1]) as FilledString;
  let longestLength = strArr1.length;

  for (let i = 0; i < longestLength; i++) {
    let foundLetterIndex = strArr2.findIndex((c) => c === strArr1[i]);

    // Couldn't find the letter... push it on the end.
    if (foundLetterIndex < 0) {
      strArr2.push(null);
      continue;
    }

    // The second word's letter is earlier in the word,
    // which means letters were removed from the beginning,
    // and we're going to need to stuff it from the front.
    if (foundLetterIndex) {
      let indexDiff = i - foundLetterIndex;
      strArr2 = new Array(indexDiff).fill(null).concat(strArr2);
    }
  }

  // Guarantee that the second string has items.
  if (!strArr2.length) {
    strArr2.length = longestLength;
    (strArr2 as FilledString).fill(null);
  }

  return [strArr1, strArr2];
};

export const fillStrings = (strs: string[]): FilledString[] => {
  let shouldFlip = strs[1].length > strs[0].length;

  if (shouldFlip) {
    strs = [strs[1], strs[0]];
  }

  let filledArrs = fill(strs);

  return shouldFlip ? [filledArrs[1], filledArrs[0]] : filledArrs;
};
