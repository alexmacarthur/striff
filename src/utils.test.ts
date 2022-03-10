import { fillStrings } from "./utils";

describe("strings with non-duplicate characters", () => {
  it("Fills strings adding characters to end.", () => {
    const [arr1, arr2] = fillStrings(["abc", "abcd"]);

    expect(arr1).toEqual(["a", "b", "c", null]);
    expect(arr2).toEqual(["a", "b", "c", "d"]);
  });

  it("Fills strings adding characters to beginning.", () => {
    const [arr1, arr2] = fillStrings(["abc", "xxabc"]);

    expect(arr1).toEqual([null, null, "a", "b", "c"]);
    expect(arr2).toEqual(["x", "x", "a", "b", "c"]);
  });

  it("Fills strings removing characters from beginning.", () => {
    const [arr1, arr2] = fillStrings(["abc", "bc"]);

    expect(arr1).toEqual(["a", "b", "c"]);
    expect(arr2).toEqual([null, "b", "c"]);
  });

  it("Fills strings removing characters from end.", () => {
    const [arr1, arr2] = fillStrings(["abc", "a"]);

    expect(arr1).toEqual(["a", "b", "c"]);
    expect(arr2).toEqual(["a", null, null]);
  });
});

describe("strings with duplicate characters", () => {
  it("Fills strings adding characters to end.", () => {
    const [arr1, arr2] = fillStrings(["abc", "abccc"]);

    expect(arr1).toEqual(["a", "b", "c", null, null]);
    expect(arr2).toEqual(["a", "b", "c", "c", "c"]);
  });

  it("Fills strings adding characters to beginning.", () => {
    const [arr1, arr2] = fillStrings(["abc", "xxxabc"]);

    expect(arr1).toEqual([null, null, null, "a", "b", "c"]);
    expect(arr2).toEqual(["x", "x", "x", "a", "b", "c"]);
  });

  it("Fills strings removing characters from beginning.", () => {
    const [arr1, arr2] = fillStrings(["abbbc", "bc"]);

    expect(arr1).toEqual(["a", "b", "b", "b", "c"]);
    expect(arr2).toEqual([null, null, null, "b", "c"]);
  });

  it("Fills strings removing characters from end.", () => {
    const [arr1, arr2] = fillStrings(["abbbc", "abb"]);

    expect(arr1).toEqual(["a", "b", "b", "b", "c"]);
    expect(arr2).toEqual(["a", "b", "b", null, null]);
  });

  it("Fills strings removing MORE characters from end.", () => {
    const [arr1, arr2] = fillStrings(["abbbc", "ab"]);

    expect(arr1).toEqual(["a", "b", "b", "b", "c"]);
    expect(arr2).toEqual(["a", "b", null, null, null]);
  });
});
