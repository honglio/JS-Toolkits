// PROBLEM

// a function that accepts a string as it's only argument.
// The string consists of comma-separated values and all values are either an integer or a string.
// Return an array of the parsed input string.

// e.g.
// f('2,6,3,2,5') // [ 2, 6, 3, 2, 5 ]
// f('"pears","apples","walnuts","cheese,cake"') // [ "pears", "apples", "walnuts", "cheese,cake" ]


// SOLUTION

// This can be accomplished using "JSON.parse('[' + csv + ']')", where the csv is the input object.
