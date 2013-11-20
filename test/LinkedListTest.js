var assert = require('assert');
var LinkedList = require('../script/datastructures/LinkedList');

var list = new LinkedList();

describe('push()', function() {
    it('push three numbers, should be push to the end in sequence', function() {
        list.push(1);
        assert.deepEqual(list.first(), 1);
        assert.deepEqual(list.last(), 1);
        list.push(0);
        assert.deepEqual(list.first(), 1);
        assert.deepEqual(list.last(), 0);
        list.push(-1);
        assert.deepEqual(list.first(), 1);
        assert.deepEqual(list.last(), -1);
    });

    it('push two Arrays, should be push to the end in sequence', function() {
        list.push([2, 3, 4, 5]);
        assert.deepEqual(list.last(), [2, 3, 4, 5]);
        list.push(['oreo', 'peanut', 'sugar']);
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
    });

    it('Returns an undefined on empty push', function() {
        list.push();
        assert.deepEqual(list.last(), undefined);
    });

    it('Returns null values on null push', function() {
        list.push(null);
        assert.deepEqual(list.last(), null);
        list.push(undefined);
        assert.deepEqual(list.last(), undefined);
    });
});


describe('pop()', function() {
    it('should pop an element from the end', function() {
        list.pop();
        assert.deepEqual(list.first(), 1);
        assert.deepEqual(list.last(), null);
    });
    it('should pop two element from the end', function() {
        list.pop();
        list.pop();
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
    });
});

describe('shift()', function() {
    it('should delete an element from beginning of the list', function() {
        list.shift();
        assert.deepEqual(list.first(), 0);
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
    });
    it('should delete two elements from beginning of the list', function() {
        list.shift();
        list.shift();
        assert.deepEqual(list.first(), [2, 3, 4, 5]);
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
    });
});

describe('unshift()', function() {
    it('should insert an Array in the beginning', function() {
        list.unshift([2, 4, 5]);
        assert.deepEqual(list.first(), [2, 4, 5]);
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
    });

    it('should insert an string in the beginning', function() {
        list.unshift('zhang');
        assert.deepEqual(list.first(), 'zhang');
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
    });

    it('should insert an null in the beginning', function() {
        list.unshift(null);
        assert.deepEqual(list.first(), null);
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
    });
});

describe('forEach()', function() {
    var list2 = new LinkedList();

    it("copy each element from list to list2", function() {
        // console.log("During");
        list.forEach(function(element, idx, array) {
            list2.push(element);
        });

        assert.deepEqual(list2.first(), null);
        assert.deepEqual(list2.last(), ['oreo', 'peanut', 'sugar']);
    });
});
