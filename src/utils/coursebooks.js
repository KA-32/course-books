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

      if(found){
        filteredCourseBooks.push(value);
      }
    });
    // this.courseBooks = this._resetRelevance();
    // this.courseBooks.forEach((value) => {
    //   let queryWords = query.split(" ");
    //   queryWords.forEach((word) => {
    //     if (value.summary.indexOf(word) > -1) {
    //       value.relevance++;
    //     }
    //   });

    //   //If entire query exactly matches.
    //   if (value.summary.indexOf(query) > -1) {
    //     value.relevance += 5;
    //   }

    //   if (value.summary.indexOf(query.toString().toLowerCase()) > -1) {
    //     value.relevance += 0.25;
    //   }
    // });

    // //Rule 1, If entire query matches exactly then will have high score of 5.
    // //Rule 2, If any word in the query matches exactly then will have score of 2
    // //Rule 3, If any word matches query after case conversion then will have score of 1
    // //Rule 4, If the word in the query occurs most of the time then it has more weight.

    // //Sort Summaries based on relevance.
    // //From high relevance to low.
    // this.courseBooks.sort((a, b) => {
    //   if (a.relevance >= b.relevance) {
    //     return -1;
    //   }
    //   return 1;
    // });
    // console.timeEnd();

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
