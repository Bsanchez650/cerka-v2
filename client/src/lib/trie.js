/**
 * Trie Node for efficient autocomplete search
 */
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.data = null;
  }
}

/**
 * Trie Data Structure for autocomplete functionality
 * DSA Concept: Prefix tree for O(m) search where m = query length
 */
export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Insert a word into the trie with associated data
   */
  insert(word, data = null) {
    let node = this.root;
    const normalizedWord = word.toLowerCase();

    for (const char of normalizedWord) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }

    node.isEndOfWord = true;
    node.data = data;
  }

  /**
   * Search for exact word match
   */
  search(word) {
    const node = this._findNode(word);
    return node !== null && node.isEndOfWord;
  }

  /**
   * Check if there's any word with given prefix
   */
  startsWith(prefix) {
    return this._findNode(prefix) !== null;
  }

  /**
   * Get all autocomplete suggestions for a given prefix
   */
  autocomplete(prefix, limit = 10) {
    const results = [];
    const node = this._findNode(prefix);

    if (!node) {
      return results;
    }

    this._collectWords(node, prefix.toLowerCase(), results, limit);
    return results;
  }

  /**
   * Find node at the end of prefix
   */
  _findNode(prefix) {
    let node = this.root;
    const normalizedPrefix = prefix.toLowerCase();

    for (const char of normalizedPrefix) {
      if (!node.children.has(char)) {
        return null;
      }
      node = node.children.get(char);
    }

    return node;
  }

  /**
   * Collect all words from a node using DFS
   */
  _collectWords(node, currentWord, results, limit) {
    if (results.length >= limit) {
      return;
    }

    if (node.isEndOfWord) {
      results.push({ word: currentWord, data: node.data });
    }

    for (const [char, childNode] of node.children) {
      this._collectWords(childNode, currentWord + char, results, limit);
    }
  }

  /**
   * Get fuzzy search results (allows for typos)
   * DSA Concept: Levenshtein distance for edit-distance matching
   */
  fuzzySearch(query, maxDistance = 2, limit = 10) {
    const results = [];
    const normalizedQuery = query.toLowerCase();

    this._fuzzySearchHelper(this.root, "", normalizedQuery, 0, maxDistance, results, limit);

    return results.sort((a, b) => a.distance - b.distance);
  }

  _fuzzySearchHelper(node, currentWord, query, distance, maxDistance, results, limit) {
    if (results.length >= limit || distance > maxDistance) {
      return;
    }

    if (node.isEndOfWord && currentWord.length >= query.length - maxDistance) {
      const finalDistance = this._levenshteinDistance(currentWord, query);
      if (finalDistance <= maxDistance) {
        results.push({ word: currentWord, data: node.data, distance: finalDistance });
      }
    }

    for (const [char, childNode] of node.children) {
      const newDistance = query[currentWord.length] === char ? distance : distance + 1;
      this._fuzzySearchHelper(childNode, currentWord + char, query, newDistance, maxDistance, results, limit);
    }
  }

  _levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }
}
