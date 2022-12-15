import deleteRef from "./deleteRef";
import toCharacters from "./toCharacters";
import { it, expect } from "vitest";

it("deletes refs from characters", () => {
  let string = toCharacters("abc");
  let result = string.map(deleteRef);

  expect(result).toEqual([
    {
      index: 0,
      value: "a",
    },
    {
      index: 1,
      value: "b",
    },
    {
      index: 2,
      value: "c",
    },
  ]);
});
