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

  getNode() {
    let node = new CharNode();
    return node;
  }

  insert(rootNode, key) {
    let tempNode = rootNode;

    for (let level = 0; level < key.length; level++) {
      let index = CHAR_TO_INDEX(key[level]);

      if (!tempNode.children[index]) {
        tempNode.children[index] = this.getNode();
      }

      tempNode = tempNode.children[index];
    }

    // mark last node as leaf
    tempNode.isWordEnd = true;
  }

  isLastNode(rootNode) {
    for (let i = 0; i < this.NUM_OF_ALPHABETS; i++) {
      if (rootNode.children[i]) {
        return false;
      }
    }

    return true;
  }

  storeSuggestions(rootNode, currentPrefix) {
    // found a string in Trie with the given prefix
    if (rootNode.isWordEnd) {
      this.suggestions.push(currentPrefix);
    }

    // All children node pointers are null
    if (this.isLastNode(rootNode)) {
      return;
    }

    for (let i = 0; i < this.NUM_OF_ALPHABETS; i++) {
      if (rootNode.children[i]) {
        if (i === 26) {
          //Handle space in the match.
          currentPrefix = currentPrefix + " ";
        } else if (i === 27) {
          //Handle space in the match.
          currentPrefix = currentPrefix + ".";
        } else if (i === 28) {
          //Handle space in the match.
          currentPrefix = currentPrefix + ",";
        } else if (i === 29) {
          //Handle space in the match.
          currentPrefix = currentPrefix + "(";
        } else if (i === 30) {
          //Handle space in the match.
          currentPrefix = currentPrefix + ")";
        } else if (i === 31) {
          //Handle space in the match.
          currentPrefix = currentPrefix + "'";
        } else {
          currentPrefix = currentPrefix + String.fromCharCode(97 + i);
        }
        // recur over the rest
        this.storeSuggestions(rootNode.children[i], currentPrefix);
        // remove last character
        currentPrefix = currentPrefix.substring(0, currentPrefix.length - 1);
      }
    }
  }

  getSuggestions(rootNode, query) {
    let tempNode = rootNode;
    this.suggestions = [];

    // Check if prefix is present and find the
    // the node (of last level) with last character
    // of given string.

    for (let level = 0; level < query.length; level++) {
      let index = CHAR_TO_INDEX(query[level]);
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
    let isLast = this.isLastNode(tempNode);

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
      this.storeSuggestions(tempNode, prefix);
      return 1;
    }
  }

  getList() {
    return this.suggestions;
  }
}

export const getRootNode = () => {
  return new CharNode();
};

export const Autocomplete = new AutocompleteUtil();
