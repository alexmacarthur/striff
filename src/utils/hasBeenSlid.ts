import { Character } from "../types";

let joinRange = (
  arr: Character[],
  rangeStart: number,
  rangeEnd: number
): string => {
  return arr
    .slice(rangeStart, rangeEnd)
    .map((c) => c.value)
    .join("");
};

let isPartialSubstring = (
  divisor: Character[],
  dividend: Character[],
  index: number
) => {
  let subString = joinRange(divisor, index, index + 2);
  let regex = new RegExp(subString);

  if (subString.length < 2) {
    return false;
  }

  return regex.test(joinRange(dividend, 0, dividend.length));
};

let hasBeenSlid = (arrs: Character[][], index: number) => {
  let [clone1, clone2] = arrs.map((a) => [...a]);

  return (
    isPartialSubstring(clone1, clone2, index) ||
    isPartialSubstring(clone2, clone1, index)
  );
};

export default hasBeenSlid;
