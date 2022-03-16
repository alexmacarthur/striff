import hasBeenSlid from "./hasBeenSlid";
import toCharacters from "./toCharacters";

it("returns true when string has been shifted", () => {
  let str1 = ["a", "b", "c", "d"];
  let str2 = ["b", "c", "d"];

  let result = hasBeenSlid([toCharacters(str1), toCharacters(str2)], 2);

  expect(result).toBe(true);
});

it("returns false when index is out of range for a string", () => {
  let str1 = ["a", "b", "c", "d"];
  let str2 = ["b", "c", "d"];

  let result = hasBeenSlid([toCharacters(str1), toCharacters(str2)], 3);

  expect(result).toBe(false);
});
