import CourseBooks from './coursebooks';

describe("CourseBooks utility class",()=>{
    test("Single instance of the class should be created.",()=>{
        expect(CourseBooks).toBeDefined();
    });

    test("total 55 titles should be present",()=>{
        expect(CourseBooks.getAllTitles().length).toBe(55);
    });

    test("get titles",()=>{
        expect(CourseBooks.getAllTitles()).toContain('Anything You Want');
    });

    test("total 55 summaries should be present",()=>{
        expect(CourseBooks.getSummaries().length).toBe(55);
    });

    test("total 55 authors should be present",()=>{
        expect(CourseBooks.getAuthors().length).toBe(55);
    });

});