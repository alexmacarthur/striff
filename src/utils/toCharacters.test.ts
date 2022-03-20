import toCharacters from "./toCharacters";

it("converts a string into characters", () => {
  let result = toCharacters("hi");

  expect(result).toEqual([
    { value: "h", index: 0, ref: null },
    { value: "i", index: 1, ref: null },
  ]);
});

it("sets ref when parameter is passed", () => {
  let result = toCharacters("bye", true);

  expect(result).toEqual([
    { value: "b", index: 0, ref: expect.any(Symbol) },
    { value: "y", index: 1, ref: expect.any(Symbol) },
    { value: "e", index: 2, ref: expect.any(Symbol) },
  ]);
});
