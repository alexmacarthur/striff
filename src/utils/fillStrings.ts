import { FilledString } from "../types";
import latestEmptyMatchingIndex from "./latestEmptyMatchingIndex";
import hasBeenSlid from "./hasBeenSlid";
import toCharacters from "./toCharacters";

const fill = (str1: string[], str2: string[]): FilledString[] => {
  let strArr1 = toCharacters(str1);
  let strArr2 = toCharacters(str2);

  for (let index = 0; index < strArr1.length; index++) {
    let character = strArr1[index];

    if (character.value === null) {
      continue;
    }

    // Find a matching character in the other string that we haven't accounted for already.
    let secondStringCharacter = strArr2.find(
      (c) => c.value === character.value && !c.accountedFor
    );
    let doesNotExist = !secondStringCharacter && strArr2[index] !== null;

    if (secondStringCharacter) {
      secondStringCharacter.accountedFor = true;
    }

    let isChangedCharacter =
      character?.value &&
      strArr2[index]?.value &&
      character?.value !== strArr2[index]?.value;

    if (isChangedCharacter && !hasBeenSlid([strArr1, strArr2], index)) {
      continue;
    }

    let latestIndexMatch = latestEmptyMatchingIndex({
      initialIndex: index,
      arr1: strArr1,
      arr2: strArr2,
      character: strArr2[index],
    });

    let difference = latestIndexMatch - index;

    if (difference > 0) {
      let insertIndex = Math.round(index / strArr2.length) ? index + 1 : index;
      let fillerItems = new Array(difference).fill({
        value: null,
        accountedFor: true,
      });
      strArr2.splice(insertIndex, 0, ...fillerItems);
      index = latestIndexMatch;
      continue;
    }

    if (doesNotExist) {
      strArr2.splice(index, 0, { value: null, accountedFor: true });
      continue;
    }
  }

  return [strArr1.map((c) => c.value), strArr2.map((c) => c.value)];
};

const split = (str: string): string[] => str.split("");

export const fillStrings = (str1: string, str2: string): FilledString[] => {
  let strArr1 = split(str1);
  let strArr2 = split(str2);

  [strArr1 as FilledString, strArr2 as FilledString] = fill(strArr1, strArr2);
  [strArr2 as FilledString, strArr1 as FilledString] = fill(strArr2, strArr1);

  return [strArr1, strArr2];
};
