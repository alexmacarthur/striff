import { FilledString } from "./types";

const split = (str: string): string[] => str.split("");

export const fillStrings = (str1: string, str2: string): FilledString[] => {
  const strArr1 = split(str1);
  const strArr2 = split(str2);
  const longestLength = Math.max(str1.length, str2.length);

  for (let i = 0; i < longestLength; i++) {
    if (strArr1[i] === strArr2[i]) {
      continue;
    }

    (strArr2.length > strArr1.length ? strArr1 : strArr2).splice(
      i,
      0,
      null as unknown as string
    );
  }

  return [strArr1, strArr2];
};
