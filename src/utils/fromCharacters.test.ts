import { Character } from "../types";
import fromCharacters from "./fromCharacters";

it("converts characters to a string", () => {
  let characters: Character[] = [
    { value: "b", index: 0, ref: null },
    { value: "y", index: 1, ref: null },
    { value: "e", index: 2, ref: null },
  ];

  let result = fromCharacters(characters);

  expect(result).toEqual("bye");
});
