/**
 * CourseBooks Utility.
 * Returns the list of summaries matched for a given query.
 *
 * Singleton Object.
 */

import data from "../data/data.json";
import { getRootNode, Autocomplete } from "./autocomplete";

class CourseBooks {
  constructor() {
    this.rootNode = "";
    this.titles = data.titles ? data.titles : [];
    this.authors = data.authors ? data.authors : [];
    this.summaries = data.summaries.map((value) => {
      let summary = value;
      summary.relevance = 0;
      return summary;
    });
    this.courseBooks = this.generateCourseBooks();
    this._buildSummaryTree();
  }

  _buildSummaryTree() {
    this.rootNode = getRootNode();
    this.summaries.forEach((value) => {
      Autocomplete.insert(
        this.rootNode,
        value.summary.split(":")[1].toLowerCase().trim()
      );
    });
  }

  generateCourseBooks() {
    let courseBooks = this.summaries.map((value, index) => {
      let courseBook = {};
      courseBook.title = this.titles[index];
      courseBook.summary = value.summary;
      courseBook.author = this.authors[index].author;
      courseBook.relevance = 0;
      return courseBook;
    });
    return courseBooks;
  }

  _resetRelevance() {
    let courseBooks = this.courseBooks.map((value) => {
      let summary = value;
      summary.relevance = 0;
      return summary;
    });

    return courseBooks;
  }

  //TODO:Throttlling would be better to reduce number of calls between each char change.
  search(query) {
    Autocomplete.getSuggestions(this.rootNode, query);

    let filteredCourseBooks = [];
    this.courseBooks.forEach((value) => {
      let found = false;
      Autocomplete.getList().forEach((suggestion) => {
        if (!found && value.summary.toLowerCase().indexOf(suggestion) > -1) {
          found = true;
        }
      });

      if (found) {
        filteredCourseBooks.push(value);
      }
    });

    console.log("Books", filteredCourseBooks);
    return filteredCourseBooks;
  }

  getTitleIndex(value) {
    return this.titles.findIndex((title) => title === value);
  }

  getCoursebook(value) {
    let courseBook = {};
    let indexOfTitle = this.getTitleIndex(value);
    let summary = this.summaries[indexOfTitle]; //one to one match to title and summary
    let author = this.authors[indexOfTitle]; //one to one match title and author

    courseBook.title = value;
    courseBook.author = author.author;
    courseBook.description = summary.summary;

    return courseBook;
  }

  getSelectedTitles() {
    let titles = this.courseBooks.map((value) => {
      return value.title;
    });

    return titles;
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
