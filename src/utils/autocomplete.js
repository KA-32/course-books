/**
 * construtctor function to return node to hold each char.
 */
function CharNode() {
  this.children = [];
  this.isWordEnd = false;
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

  return char.charCodeAt() - "a".charCodeAt();
}

/**
 * AutocompleteUtil utility using Trie DS.
 */

class AutocompleteUtil {
  constructor() {
    this.NUM_OF_ALPHABETS = 32;
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
      this.suggestions.push(currentPrefix);
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
    this.suggestions = [];

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
  getList() {
    return this.suggestions;
  }
}

export const getRootNode = () => {
  return new CharNode();
};

export const Autocomplete = new AutocompleteUtil();
