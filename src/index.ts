import { Diff, DiffResult } from "./types";
import { fillStrings } from "./utils";

const striff = (str1: string, str2: string): DiffResult => {
  const added: Diff[] = [];
  const removed: Diff[] = [];
  const [strArr1, strArr2] = fillStrings(str1, str2);

  for (let i = 0; i < strArr1.length; i++) {
    if (strArr1[i] === strArr2[i]) {
      continue;
    }

    if (strArr2[i]) {
      added.push({
        character: strArr2[i] as string,
        index: i,
      });
    }

    if (strArr1[i]) {
      removed.push({
        character: strArr1[i] as string,
        index: i,
      });
    }
  }

  return { added, removed };
};

export default striff;
