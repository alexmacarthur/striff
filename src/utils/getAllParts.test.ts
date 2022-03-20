import getAllParts from "./getAllParts";
import toCharacters from "./toCharacters";

it("crawls string to break it into parts", () => {
  let string = toCharacters("abc");
  let result = getAllParts(string);

  expect(result).toEqual([
    [{ value: "a", index: 0, ref: null }],
    [
      { value: "a", index: 0, ref: null },
      { value: "b", index: 1, ref: null },
    ],
    [
      { value: "a", index: 0, ref: null },
      { value: "b", index: 1, ref: null },
      { value: "c", index: 2, ref: null },
    ],
    [{ value: "b", index: 1, ref: null }],
    [
      { value: "b", index: 1, ref: null },
      { value: "c", index: 2, ref: null },
    ],
    [{ value: "c", index: 2, ref: null }],
  ]);
});

it("gets parts of small string", () => {
  let string = toCharacters("a");
  let result = getAllParts(string);

  expect(result).toEqual([[{ value: "a", index: 0, ref: null }]]);
});
