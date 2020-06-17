import { getRootNode, Autocomplete } from "./autocomplete";

describe("Autocomplete utility class", () => {
  test("Single instance of the class should be created.", () => {
    expect(Autocomplete).toBeDefined();
  });

  test("'getRootNode()' should return a node", () => {
    expect(getRootNode()).toEqual({
      children: [],
      isWordEnd: false,
      hits: 0,
      prevSummaryInserted: "",
    });
  });

  test("search suggestions", () => {
    let rootNode = getRootNode();
    Autocomplete.insert(rootNode, "hello");
    Autocomplete.insert(rootNode, "hel");
    expect(Autocomplete.getSuggestions(rootNode, "")).toBe(1);
  });

  test("no suggestions found for query 'world'", () => {
    let rootNode = getRootNode();
    Autocomplete.insert(rootNode, "hello");
    Autocomplete.insert(rootNode, "hel");
    expect(Autocomplete.getSuggestions(rootNode, "world")).toBe(0);
  });

  test("no suggestions found for query 'world'", () => {
    let rootNode = getRootNode();
    Autocomplete.insert(rootNode, "hello world");
    Autocomplete.insert(rootNode, "hel");
    expect(Autocomplete.getSuggestions(rootNode, "world")).toBe(0);
  });

  test("suggestions found for query 'hello'", () => {
    let rootNode = getRootNode();
    Autocomplete.insert(rootNode, "hello world");
    Autocomplete.insert(rootNode, "hel");
    expect(Autocomplete.getSuggestions(rootNode, "hello")).toBe(1);
    expect(Autocomplete.getList(1).length).toBe(1);
    expect(Autocomplete.getList(1)).toEqual([
      { hits: 1, summary: "hello world" },
    ]);
  });
});
