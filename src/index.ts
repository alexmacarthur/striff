import { DiffResult } from "./types";
import { fillStrings } from "./utils/fillStrings";
import getDiff from "./utils/getDiff";

const striff = (str1: string, str2: string): DiffResult => {
  let [strArr1, strArr2] = fillStrings(str1, str2);

  return {
    added: getDiff(strArr2, strArr1),
    removed: getDiff(strArr1, strArr2),
  };
};

export default striff;
