import { Character } from "../types";
import fromCharacters from "./fromCharacters";
import { it, expect } from "vitest";

it("converts characters to a string", () => {
  let characters: Character[] = [
    { value: "b", index: 0, ref: Symbol("b"), pointsTo: null },
    { value: "y", index: 1, ref: Symbol("y"), pointsTo: null },
    { value: "e", index: 2, ref: Symbol("e"), pointsTo: null },
  ];

  let result = fromCharacters(characters);

  expect(result).toEqual("bye");
});
