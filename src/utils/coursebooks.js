/**
 * CourseBooks Utility.
 * Returns the list of summaries matched for a given query.
 *
 * Singleton Object.
 */

import data from "../data/data.json";

class CourseBooks {
  constructor() {
    this.titles = data.titles ? data.titles : [];
    this.authors = data.authors ? data.authors : [];
    this.summaries = data.summaries.map((value) => {
      let summary = value;
      summary.relevance = 0;
      return summary;
    });
  }

  find(query) {
    // console.log(query);
    this.summaries.forEach((value) => {
      if (value.summary.indexOf(query) > -1) {
        value.relevance++;
      }
    });

    //Rule 1, If entire query matches exactly then will have high score of 5.
    //Rule 2, If any word in the query matches exactly then will have score of 2
    //Rule 3, If any word matches query after case conversion then will have score of 1
    //Rule 4, If the word in the query occurs most of the time then it has more weight.

    //Sort Summaries based on relevance.
    //From high relevance to low.
    // console.log("Summaries", this.summaries);
  }

  getTitleIndex(value) {
    return this.titles.findIndex((title) => title === value);
  }

  getCoursebook(value) {
    let courseBook = {};
    let indexOfTitle = this.getTitleIndex(value);
    let summary = this.summaries[indexOfTitle];//one to one match to title and summary
    let author = this.authors[indexOfTitle];//one to one match title and author

    courseBook.title = value;
    courseBook.author = author.author;
    courseBook.description = summary.summary;

    return courseBook;
  }

  getAllTitles() {
    return this.titles;
  }

  getSummaries() {
    return this.summaries;
  }

  getAuthors() {
    return this.authors;
  }
}

export default new CourseBooks();
