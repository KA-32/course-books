/**
 * construtctor function to return node to hold each char.
 */
function CharNode() {
  this.children = [];
  this.isWordEnd = false;
  this.hits = 0;
  this.prevSummaryInserted = "";
}

function CHAR_TO_INDEX(char) {
  //check if there is space.
  if (char === " ") {
    return 26;
  }

  if (char === ".") {
    return 27;
  }

  if (char === ",") {
    return 28;
  }

  if (char === "(") {
    return 29;
  }

  if (char === ")") {
    return 30;
  }

  if (char === "'") {
    return 31;
  }

  if (char === '"') {
    return 32;
  }

  if (parseInt(char) === 0) {
    return 33;
  }
  if (parseInt(char) === 1) {
    return 34;
  }
  if (parseInt(char) === 2) {
    return 35;
  }
  if (parseInt(char) === 3) {
    return 36;
  }
  if (parseInt(char) === 4) {
    return 37;
  }
  if (parseInt(char) === 5) {
    return 38;
  }
  if (parseInt(char) === 6) {
    return 39;
  }
  if (parseInt(char) === 7) {
    return 40;
  }
  if (parseInt(char) === 8) {
    return 41;
  }
  if (parseInt(char) === 9) {
    return 42;
  }

  return char.charCodeAt() - "a".charCodeAt();
}

/**
 * AutocompleteUtil utility using Trie DS.
 */

class AutocompleteUtil {
  constructor() {
    this.NUM_OF_ALPHABETS = 43;
    this.suggestions = [];
  }

  /**
   * @private
   */
  _getNode() {
    let node = new CharNode();
    return node;
  }

  /**
   * insert the given key into trie.
   * @param {*} rootNode
   * @param {*} key
   * @public
   */
  insert(rootNode, key) {
    let tempNode = rootNode;

    for (let level = 0; level < key.length; level++) {
      let index = CHAR_TO_INDEX(key[level]);

      if (!tempNode.children[index]) {
        tempNode.children[index] = this._getNode();
      }

      tempNode = tempNode.children[index];
    }

    // mark last node as the end of word.
    tempNode.isWordEnd = true;
  }

  /**
   * Check if given node is last node.
   * @param {*} rootNode
   * @private
   */
  _isLastNode(rootNode) {
    for (let i = 0; i < this.NUM_OF_ALPHABETS; i++) {
      if (rootNode.children[i]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Store suggestions.
   * @param {*} rootNode
   * @param {*} currentPrefix
   * @private
   */
  _storeSuggestions(rootNode, currentPrefix) {
    // found a string with the given prefix
    if (rootNode.isWordEnd) {
      rootNode.hits++;
      if (rootNode.prevSummaryInserted !== currentPrefix) {
        let summary = {};
        summary.summary = currentPrefix;
        summary.hits = rootNode.hits;
        this.suggestions.push(summary);
        rootNode.prevSummaryInserted = currentPrefix;
      } else {
        for (let i = 0; i < this.suggestions.length; i++) {
          if (this.suggestions[i].summary === currentPrefix) {
            this.suggestions[i].hits++;
            break;
          }
        }
      }

      this.suggestions.sort((a, b) => {
        if (a.hits < b.hits) {
          return 1;
        }
        return -1;
      });
    }

    // All children node pointers are null
    if (this._isLastNode(rootNode)) {
      return;
    }

    for (let i = 0; i < this.NUM_OF_ALPHABETS; i++) {
      if (rootNode.children[i]) {
        if (i === 26) {
          //Handle space in the match.
          currentPrefix = currentPrefix + " ";
        } else if (i === 27) {
          //Handle . in the match.
          currentPrefix = currentPrefix + ".";
        } else if (i === 28) {
          //Handle , in the match.
          currentPrefix = currentPrefix + ",";
        } else if (i === 29) {
          //Handle ( in the match.
          currentPrefix = currentPrefix + "(";
        } else if (i === 30) {
          //Handle ) in the match.
          currentPrefix = currentPrefix + ")";
        } else if (i === 31) {
          //Handle ' in the match.
          currentPrefix = currentPrefix + "'";
        } else if (i === 32) {
          //Handle " in the match.
          currentPrefix = currentPrefix + '"';
        }else if (i === 33) {
          //Handle 0 in the match.
          currentPrefix = currentPrefix + 0;
        }else if (i === 34) {
          //Handle 1 in the match.
          currentPrefix = currentPrefix + 1;
        }else if (i === 35) {
          //Handle 2 in the match.
          currentPrefix = currentPrefix + 2;
        }else if (i === 36) {
          //Handle 3 in the match.
          currentPrefix = currentPrefix + 3;
        }else if (i === 37) {
          //Handle 4 in the match.
          currentPrefix = currentPrefix + 4;
        }else if (i === 38) {
          //Handle 5 in the match.
          currentPrefix = currentPrefix + 5;
        }else if (i === 39) {
          //Handle 6 in the match.
          currentPrefix = currentPrefix + 6;
        }else if (i === 40) {
          //Handle 7 in the match.
          currentPrefix = currentPrefix + 7;
        }else if (i === 41) {
          //Handle 8 in the match.
          currentPrefix = currentPrefix + 8;
        } else if (i === 42) {
          //Handle 9 in the match.
          currentPrefix = currentPrefix + 9;
        } else {
          currentPrefix = currentPrefix + String.fromCharCode(97 + i);
        }

        this._storeSuggestions(rootNode.children[i], currentPrefix);
        // remove last character
        currentPrefix = currentPrefix.substring(0, currentPrefix.length - 1);
      }
    }
  }

  /**
   * Get suggestions for given query string.
   * @param {*} rootNode
   * @param {*} query
   * @public
   */
  getSuggestions(rootNode, query) {
    let tempNode = rootNode;

    // Check if prefix is present and find the node with last character of given string.
    //For each level.
    for (let i = 0; i < query.length; i++) {
      let index = CHAR_TO_INDEX(query[i]);
      // no string in the Trie has this prefix
      if (!tempNode.children[index]) {
        return 0;
      }

      tempNode = tempNode.children[index];
    }

    // If prefix is present as a word.
    let isWord = tempNode.isWordEnd === true;
    // If prefix is last node of tree (has no
    // children)
    let isLast = this._isLastNode(tempNode);

    // If prefix is present as a word, but
    // there is no subtree below the last
    // matching node.
    if (isWord && isLast) {
      this.suggestions.push(query);
      return -1;
    }

    // If there are are nodes below last
    // matching character.
    if (!isLast) {
      let prefix = query;
      this._storeSuggestions(tempNode, prefix);
      return 1;
    }
  }

  /**
   * Returns the suggestions list.
   * @public
   */
  getList(numOfSuggestions) {
    return this.suggestions.slice(0, parseInt(numOfSuggestions));
  }
}

export const getRootNode = () => {
  return new CharNode();
};

export const Autocomplete = new AutocompleteUtil();
