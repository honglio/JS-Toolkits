/*
    # Word Analytics

    You're a newly hired engineer for a brand-new company that's building a "killer Word-like application". You've been specifically assigned to implement a tool that gives the user some details on common word usage, letter usage, and some other analytics for a given document! More specifically, you must read a given text file (no special formatting, just a plain ASCII text file) and print off the following details:

    1. Number of words
    2. Number of letters
    3. Number of symbols (any non-letter and non-digit character, excluding white spaces)
    4. Top three most common words (you may count "small words", such as "it" or "the")
    5. Top three most common letters
    6. Most common first word of a paragraph (paragraph being defined as a block of text with an empty line above it) (Optional bonus)
    7. Number of words only used once (Optional bonus)
    8. All letters not used in the document (Optional bonus)

    Please note that your tool does not have to be case sensitive, meaning the word "Hello" is the same as "hello" and "HELLO".

    *Author: nint22*

    ## Formal Inputs & Outputs

    ### Input Description

    As an argument to your program on the command line, you will be given a text file location (such as "C:\Users\nint22\Document.txt" on Windows or "/Users/nint22/Document.txt" on any other sane file system). This file may be empty, but will be guaranteed well-formed (all valid ASCII characters). You can assume that line endings will follow the UNIX-style new-line ending (unlike the Windows carriage-return & new-line format ).

    ### Output Description

    For each analytic feature, you must print the results in a special string format. Simply you will print off 6 to 8 sentences with the following format:

    ```
    "A words", where A is the number of words in the given document
    "B letters", where B is the number of letters in the given document
    "C symbols", where C is the number of non-letter and non-digit character, excluding white spaces, in the document
    "Top three most common words: D, E, F", where D, E, and F are the top three most common words
    "Top three most common letters: G, H, I", where G, H, and I are the top three most common letters
    "J is the most common first word of all paragraphs", where J is the most common word at the start of all paragraphs in the document (paragraph being defined as a block of text with an empty line above it) (*Optional bonus*)
    "Words only used once: K", where K is a comma-delimited list of all words only used once (*Optional bonus*)
    "Letters not used in the document: L", where L is a comma-delimited list of all alphabetic characters not in the document (*Optional bonus*)
    ```

    If there are certain lines that have no answers (such as the situation in which a given document has no paragraph structures), simply do not print that line of text. In this example, I've just generated some random Lorem Ipsum text.

    ## Testing

    ```
    cat huckleberry-finn.txt | node index.js
    ```

    ## Source

    [http://www.reddit.com/r/dailyprogrammer/comments/1e97ob/051313_challenge_125_easy_word_analytics/](http://www.reddit.com/r/dailyprogrammer/comments/1e97ob/051313_challenge_125_easy_word_analytics/)
*/
process.stdin.resume();
process.stdin.setEncoding('utf8');

// Use an object to map the characters to their count
var characters = {},
    words = {},
    wordsParagraph = {},
    isWordChar,
    filterObject,
    sortByCount;

filterObject = function(input, callback) {
    var output = {};

    Object.keys(input).forEach(function(value) {
        callback(input[value], value, input) && (output[value] = input[value]);
    });

    return output;
};

sortByCount = function(object) {
    return Object.keys(object).map(function(input) {
        return {
            value: input,
            count: object[input]
        };
    }).sort(function(a, b) {
        // Sort descending
        return b.count - a.count;
    }).map(function(input) {
        return input.value;
    });
};

isWordChar = function(char) {
    var charCode = char.charCodeAt(0);
    // Characters code not between A-Z
    return !(charCode < 65 || charCode > 90);
};

// On each input data chunk, process it using the balance checker
process.stdin.on('data', function(chunk) {
    var word = '',
        prevSymbol = '\n',
        char;

    for (var i = 0; i < chunk.length; i++) {
        char = chunk[i].toUpperCase();

        // Increment the character count
        characters[char] = (characters[char] || 0) + 1;

        if (!isWordChar(char)) {
            if (word) {
                word && (words[word] = (words[word] || 0) + 1);
                prevSymbol === '\n' && (wordsParagraph[word] = (wordsParagraph[word] || 0) + 1);
                word = ''; // Reset the current word
            }
            prevSymbol = char;
        } else {
            word += char;
        }
    }
});

process.stdin.on('end', function() {
    var sortedWords = sortByCount(words),
        sortedLetters = sortByCount(filterObject(characters, function(_, char) {
            return isWordChar(char);
        })),
        sortedWordPara = sortByCount(wordsParagraph),
        totalWords = Object.keys(words).reduce(function(memo, word) {
            return memo + words[word];
        }, 0),
        totalLetters = Object.keys(characters).reduce(function(memo, char) {
            return memo + (isWordChar(char) ? characters[char] : 0);
        }, 0),
        totalSymbols = Object.keys(characters).reduce(function(memo, char) {
            return memo + (/[^\w\s]/.test(char) ? characters[char] : 0);
        }, 0),
        unusedLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(function(char) {
            return !characters[char];
        }),
        onceWords = Object.keys(words).filter(function(word) {
            return words[word] === 1;
        });

    console.log(totalWords + ' words');
    console.log(totalLetters + ' letters');
    console.log(totalSymbols + ' symbols');
    console.log('Top three most common words: ' + sortedWords.slice(0, 3).join(', '));
    console.log('Top three most common letters: ' + sortedLetters.slice(0, 3).join(', '));
    console.log(sortedWordPara.slice(0, 1)[0] + ' is the most common first word of all paragraphs');
    console.log('Words only used once: ' + onceWords.join(', '));
    console.log('Letters not used in the document: ' + unusedLetters.join(', '));
});
