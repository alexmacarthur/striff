import striff from "./index";

it("Correctly diffs when strings are identical.", () => {
  const { added, removed } = striff("abc", "abc");

  expect(added).toHaveLength(0);
  expect(removed).toHaveLength(0);
});

describe("characters are added", () => {
  it("Correctly diffs when characters are added to end.", () => {
    const { added, removed } = striff("abc", "abcd");

    expect(removed).toHaveLength(0);
    expect(added).toEqual([{ character: "d", index: 3 }]);
  });
});

describe("characters are removed", () => {
  it("Correctly diffs when characters are removed from end.", () => {
    const { added, removed } = striff("abc", "a");

    expect(added).toHaveLength(0);
    expect(removed).toHaveLength(2);
    expect(removed).toEqual([
      {
        character: "b",
        index: 1,
      },
      {
        character: "c",
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
        character: "a",
        index: 0,
      },
    ]);
  });
});

describe("characters have changed", () => {
  it("Correctly diffs when a character has changed.", () => {
    const { added, removed } = striff("abc", "azc");

    expect(added).toHaveLength(1);
    expect(removed).toHaveLength(1);
    expect(removed).toEqual([
      {
        character: "b",
        index: 1,
      },
    ]);
    expect(added).toEqual([
      {
        character: "z",
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
        character: "a",
        index: 0,
      },
      {
        character: "b",
        index: 1,
      },
      {
        character: "c",
        index: 2,
      },
    ]);
    expect(added).toEqual([
      {
        character: "x",
        index: 0,
      },
      {
        character: "y",
        index: 1,
      },
      {
        character: "z",
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
        character: "a",
        index: 0,
      },
      {
        character: "b",
        index: 1,
      },
      {
        character: "c",
        index: 2,
      },
    ]);
    expect(added).toEqual([
      {
        character: "x",
        index: 0,
      },
      {
        character: "y",
        index: 1,
      },
      {
        character: "z",
        index: 2,
      },
      {
        character: "1",
        index: 3,
      },
      {
        character: "2",
        index: 4,
      },
    ]);
  });
});
