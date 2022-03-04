import striff from "./index";

it("Correctly diffs when strings are identical.", () => {
  const { added, removed } = striff("abc", "abc");

  expect(added).toHaveLength(0);
  expect(removed).toHaveLength(0);
});

it("Correctly diffs when characters are added to end.", () => {
  const { added, removed } = striff("abc", "abcd");

  expect(removed).toHaveLength(0);
  expect(added).toEqual([{ character: "d", index: 3 }]);
});

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
