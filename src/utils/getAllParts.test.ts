import getAllParts from "./getAllParts";
import toCharacters from "./toCharacters";

it("crawls string to break it into parts", () => {
  let string = toCharacters("abc");
  let result = getAllParts(string);

  expect(result).toEqual([
    [{ value: "a", index: 0, ref: expect.any(Symbol), pointsTo: null }],
    [
      { value: "a", index: 0, ref: expect.any(Symbol), pointsTo: null },
      { value: "b", index: 1, ref: expect.any(Symbol), pointsTo: null },
    ],
    [
      { value: "a", index: 0, ref: expect.any(Symbol), pointsTo: null },
      { value: "b", index: 1, ref: expect.any(Symbol), pointsTo: null },
      { value: "c", index: 2, ref: expect.any(Symbol), pointsTo: null },
    ],
    [{ value: "b", index: 1, ref: expect.any(Symbol), pointsTo: null }],
    [
      { value: "b", index: 1, ref: expect.any(Symbol), pointsTo: null },
      { value: "c", index: 2, ref: expect.any(Symbol), pointsTo: null },
    ],
    [{ value: "c", index: 2, ref: expect.any(Symbol), pointsTo: null }],
  ]);
});

it("gets parts of small string", () => {
  let string = toCharacters("a");
  let result = getAllParts(string);

  expect(result).toEqual([
    [{ value: "a", index: 0, ref: expect.any(Symbol), pointsTo: null }],
  ]);
});
