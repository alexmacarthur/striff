import { Character } from "../types";

type latestEmptyMatchingIndexArgs = {
  initialIndex: number;
  arr1: Character[];
  arr2: Character[];
  character: Character;
};

const latestEmptyMatchingIndex = ({
  initialIndex,
  arr1,
  arr2,
  character,
}: latestEmptyMatchingIndexArgs): number => {
  if (arr1[initialIndex]?.value !== character?.value) {
    return -1;
  }

  let nextIndex = initialIndex + 1;
  let nextCharacterIsSame = arr1[nextIndex]?.value === character.value;
  let nextSearchedCharacterIsDifferent =
    arr2[nextIndex]?.value !== character.value;

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

export default latestEmptyMatchingIndex;
