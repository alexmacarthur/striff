import striff from "./index";
import { it, expect, describe } from "vitest";

it("Correctly diffs when strings are identical.", () => {
  const { added, removed } = striff("abc", "abc");

  expect(added).toHaveLength(0);
  expect(removed).toHaveLength(0);
});

it("Strings are RegEx-escaped", () => {
  const { added, removed } = striff("Hi?", "Hi!");

  expect(removed).toEqual([{ value: "?", index: 2 }]);
  expect(added).toEqual([{ value: "!", index: 2 }]);
});

describe("characters are added", () => {
  it("Correctly diffs when characters are added to end.", () => {
    const { added, removed } = striff("abc", "abcd");

    expect(removed).toHaveLength(0);
    expect(added).toEqual([{ value: "d", index: 3 }]);
  });

  it("Correctly diffs when characters are added to middle.", () => {
    const { added, removed } = striff("hi pal", "hi, pal");

    expect(removed).toHaveLength(0);
    expect(added).toEqual([{ value: ",", index: 2 }]);
  });
});

describe("characters are removed", () => {
  it("Correctly diffs when characters are removed from end.", () => {
    const { added, removed } = striff("abc", "a");

    expect(added).toHaveLength(0);
    expect(removed).toHaveLength(2);
    expect(removed).toEqual([
      {
        value: "b",
        index: 1,
      },
      {
        value: "c",
        index: 2,
      },
    ]);
  });

  it("Correctly diffs when characters are removed from beginning.", () => {
    const { added, removed } = striff("abc", "bc");

    expect(added).toHaveLength(0);
    expect(removed).toHaveLength(1);
    expect(removed).toEqual([
      {
        value: "a",
        index: 0,
      },
    ]);
  });

  it("Correctly diffs when the same character is used multiple times.", () => {
    const { added, removed } = striff("wow", "ow");

    expect(added).toHaveLength(0);
    expect(removed).toEqual([{ value: "w", index: 0 }]);
  });
});

describe("characters have changed", () => {
  it("Correctly diffs when a character has changed.", () => {
    const { added, removed } = striff("abc", "azc");

    expect(added).toHaveLength(1);
    expect(removed).toHaveLength(1);
    expect(removed).toEqual([
      {
        value: "b",
        index: 1,
      },
    ]);
    expect(added).toEqual([
      {
        value: "z",
        index: 1,
      },
    ]);
  });

  it("Correctly diffs when many characters have changed.", () => {
    const { added, removed } = striff("abc", "xyz");

    expect(added).toHaveLength(3);
    expect(removed).toHaveLength(3);
    expect(removed).toEqual([
      {
        value: "a",
        index: 0,
      },
      {
        value: "b",
        index: 1,
      },
      {
        value: "c",
        index: 2,
      },
    ]);
    expect(added).toEqual([
      {
        value: "x",
        index: 0,
      },
      {
        value: "y",
        index: 1,
      },
      {
        value: "z",
        index: 2,
      },
    ]);
  });
});

describe("characters are changed and added", () => {
  it("correctly diffs when characters are changed an added", () => {
    const { added, removed } = striff("abc", "xyz12");

    expect(added).toHaveLength(5);
    expect(removed).toHaveLength(3);
    expect(removed).toEqual([
      {
        value: "a",
        index: 0,
      },
      {
        value: "b",
        index: 1,
      },
      {
        value: "c",
        index: 2,
      },
    ]);
    expect(added).toEqual([
      {
        value: "x",
        index: 0,
      },
      {
        value: "y",
        index: 1,
      },
      {
        value: "z",
        index: 2,
      },
      {
        value: "1",
        index: 3,
      },
      {
        value: "2",
        index: 4,
      },
    ]);
  });
});

describe("multiple subsequent characters are in middle", () => {
  it("simple example - added", () => {
    const { added, removed } = striff("yxy", "yxxxy");

    expect(added).toHaveLength(2);
    expect(removed).toHaveLength(0);
    expect(added).toEqual([
      {
        value: "x",
        index: 2,
      },
      {
        value: "x",
        index: 3,
      },
    ]);
  });

  it("simple example - removed", () => {
    const { added, removed } = striff("yxxxy", "yxy");

    expect(removed).toHaveLength(2);
    expect(added).toHaveLength(0);
    expect(removed).toEqual([
      {
        value: "x",
        index: 1,
      },
      {
        value: "x",
        index: 2,
      },
    ]);
  });

  it("line breaks are used", () => {
      const str1 = `
xxx
22
111
`;
      const str2 = `
xxx
2222
111
`;

    const { added, removed } = striff(str1, str2);

    expect(added).toHaveLength(2);
    expect(removed).toHaveLength(0);
    expect(added).toEqual([
      {
        value: "2",
        index: 7,
      },
      {
        value: "2",
        index: 8,
      }
    ]);
  });
});
