import { getRootNode, Autocomplete } from "./autocomplete";

describe("Autocomplete utility class", () => {
  test("Single instance of the class should be created.", () => {
    expect(Autocomplete).toBeDefined();
  });

  test("'getRootNode()' should return a node", () => {
    expect(getRootNode()).toEqual({ children: [], isWordEnd: false, hits:0,prevSummaryInserted:'' });
  });

  // test("total 55 titles should be present",()=>{
  //     expect(CourseBooks.getAllTitles().length).toBe(55);
  // });

  // test("get titles",()=>{
  //     expect(CourseBooks.getAllTitles()).toContain('Anything You Want');
  // });

  // test("total 55 summaries should be present",()=>{
  //     expect(CourseBooks.getSummaries().length).toBe(55);
  // });

  // test("Should match first summary",()=>{
  //     // expect(CourseBooks.getSummaries()).toContain('The Book in Three Sentences: Practicing meditation and mindfulness will make you at least 10 percent happier. Being mindful doesn\u2019t change the problems in your life, but mindfulness does help you respond to your problems rather than react to them. Mindfulness helps you realize that striving for success is fine as long as you accept that the outcome is outside your control.');
  // });

  // test("total 55 authors should be present",()=>{
  //     expect(CourseBooks.getAuthors().length).toBe(55);
  // });

  // test("Should have author",()=>{
  //     // expect(CourseBooks.getAuthors()).toContain('Dan Harris');
  // });
});
