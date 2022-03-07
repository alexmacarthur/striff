import { fillStrings } from "./utils";

it("Fills strings adding characters to end.", () => {
  const [arr1, arr2] = fillStrings(["abc", "abcd"]);

  expect(arr1).toEqual(["a", "b", "c", null]);
  expect(arr2).toEqual(["a", "b", "c", "d"]);
});

it("Fills strings adding characters to beginning.", () => {
  const [arr1, arr2] = fillStrings(["abc", "xabc"]);

  expect(arr1).toEqual([null, "a", "b", "c"]);
  expect(arr2).toEqual(["x", "a", "b", "c"]);
});

it("Fills strings removing characters from end.", () => {
  const [arr1, arr2] = fillStrings(["abc", "a"]);

  expect(arr1).toEqual(["a", "b", "c"]);
  expect(arr2).toEqual(["a", null, null]);
});

it("Fills strings removing characters from beginning.", () => {
  const [arr1, arr2] = fillStrings(["abc", "bc"]);

  expect(arr1).toEqual(["a", "b", "c"]);
  expect(arr2).toEqual([null, "b", "c"]);
});
