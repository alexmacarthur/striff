import { Diff, FilledString } from "../types";

const getDiff = (str1: FilledString, str2: FilledString) => {
  let diff: Diff[] = [];
  let lastFoundIndex = -1;

  str1.forEach((character: string | null, index: number) => {
    let secondStringIndex = str2.findIndex((c) => c === character);

    if (secondStringIndex > lastFoundIndex) {
      lastFoundIndex = index;
      return;
    }

    if (character) {
      diff.push({ character, index });
    }
  });

  return diff;
};

export default getDiff;
