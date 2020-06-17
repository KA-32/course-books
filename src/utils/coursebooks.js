/**
 * CourseBooks Utility.
 * Returns the list of summaries matched for a given query.
 *
 * Singleton Object.
 */

import data from "../data/data.json";
import { getRootNode, Autocomplete } from "./autocomplete";

/**
 * Utility class to read, write course books.
 */
class CourseBooks {
  constructor() {
    this.rootNode = "";
    this.titles = data.titles ? data.titles : [];
    this.authors = data.authors ? data.authors : [];
    this.summaries = data.summaries ? data.summaries : [];

    this.courseBooks = this._generateCourseBooks();
    this._buildSummaryTree();
  }

  /**
   * Build Prefix trie for book summaries.
   * Remove the first few words which is common.
   * @private
   */
  _buildSummaryTree() {
    this.rootNode = getRootNode();
    this.summaries.forEach((value) => {
      Autocomplete.insert(
        this.rootNode,
        value.summary.split(":")[1].toLowerCase().trim()
      );
    });
  }

  /**
   * @private
   */
  _generateCourseBooks() {
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

  /**
   *
   * @param {*} query string to search for.
   * @public
   * @returns array of summaries matched.
   */
  search(query, numOfResultsToShow) {
    Autocomplete.getSuggestions(this.rootNode, query.toLowerCase());
    let filteredCourseBooks = [];

    this.courseBooks.forEach((value) => {
      let found = false;
      Autocomplete.getList().forEach((suggestion) => {
        if (!found && value.summary.toLowerCase().indexOf(suggestion) > -1) {
          found = true;
        }
      });

      if (found && filteredCourseBooks.length < numOfResultsToShow) {
        filteredCourseBooks.push(value);
      }
    });

    return filteredCourseBooks;
  }

  _getTitleIndex(value) {
    return this.titles.findIndex((title) => title === value);
  }

  /**
   * Returns coursebook for matching title.
   * @param {*} value
   * @public
   */
  getCoursebook(value) {
    let courseBook = {};
    let indexOfTitle = this._getTitleIndex(value);
    let summary = this.summaries[indexOfTitle]; //one to one match to title and summary
    let author = this.authors[indexOfTitle]; //one to one match title and author

    courseBook.title = value;
    courseBook.author = author.author;
    courseBook.description = summary.summary;

    return courseBook;
  }

  /**
   * @public
   */
  getSelectedTitles() {
    let titles = this.courseBooks.map((value) => {
      return value.title;
    });

    return titles;
  }

  /**
   * @public
   */
  getAllTitles() {
    return this.titles;
  }

  /**
   * @public
   */
  getSummaries() {
    return this.summaries;
  }

  /**
   * @public
   */
  getAuthors() {
    return this.authors;
  }
}

export default new CourseBooks();
