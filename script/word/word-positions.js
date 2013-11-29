/*

# Find Word Positions in Text

Given a text file and a word, find the positions that the word occurs in the file. We'll be asked to find the positions of many words in the same file.

## Source

[http://www.ardendertat.com/2011/12/20/programming-interview-questions-23-find-word-positions-in-text/](http://www.ardendertat.com/2011/12/20/programming-interview-questions-23-find-word-positions-in-text/)

*/

module.exports = function(text) {
    var trie = {},
        pos = 0,
        active = trie; // Start the active structure as the root trie structure

    // Suffix a space after the text to make life easier
    text += ' ';

    // Loop through the input text adding it to the trie structure
    for (var i = 0; i < text.length; i++) {
        // When the character is a space, restart
        if (text[i] === ' ') {
            // If the current active doesn't equal the root, set the position
            if (active !== trie) {
                (active.positions = active.positions || []).push(pos);
            }
            // Reset the positions and the active part of the data structure
            pos = i;
            active = trie;
            continue;
        }

        // Set the next character in the structure up
        active[text[i]] = (active[text[i]] || {});
        active = active[text[i]];
    }

    // Return a function that accepts a word and looks it up in the trie structure
    return function(word) {
        var i = -1,
            active = trie;

        while (word[++i]) {
            if (!active[word[i]]) {
                return [];
            }
            active = active[word[i]];
        }

        return active.positions;
    };
};
