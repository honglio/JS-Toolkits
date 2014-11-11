var assert = require('assert');
var LinkedList = require('../script/datastructures/LinkedList');

var list = new LinkedList();

describe('push()', function() {
    it('push three numbers, should be push to the end in sequence', function() {
        list.push(1);
        assert.deepEqual(list.first(), 1);
        assert.deepEqual(list.last(), 1);
        assert.deepEqual(list.length, 1);
        list.push(0);
        assert.deepEqual(list.first(), 1);
        assert.deepEqual(list.last(), 0);
        assert.deepEqual(list.length, 2);
        list.push(-1);
        assert.deepEqual(list.first(), 1);
        assert.deepEqual(list.last(), -1);
        assert.deepEqual(list.length, 3);
    });

    it('push two Arrays, should be push to the end in sequence', function() {
        list.push([2, 3, 4, 5]);
        assert.deepEqual(list.last(), [2, 3, 4, 5]);
        assert.deepEqual(list.length, 4);
        list.push(['oreo', 'peanut', 'sugar']);
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
        assert.deepEqual(list.length, 5);
    });

    it('push an undefined', function() {
        list.push();
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
        assert.deepEqual(list.length, 5);
    });

    it('push an null values', function() {
        list.push(null);
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
        assert.deepEqual(list.length, 5);
        list.push(undefined);
        assert.deepEqual(list.last(), ['oreo', 'peanut', 'sugar']);
        assert.deepEqual(list.length, 5);
    });
});


describe('pop()', function() {
    it('should pop an element from the end', function() {
        list.pop();
        assert.deepEqual(list.first(), 1);
        assert.deepEqual(list.last(), [2, 3, 4, 5]);
        assert.deepEqual(list.length, 4);
    });
    it('should pop two element from the end', function() {
        list.pop();
        list.pop();
        assert.deepEqual(list.last(), 0);
        assert.deepEqual(list.length, 2);
    });
    it('should pop two element from the end', function() {
        list.pop();
        list.pop();
        assert.deepEqual(list.first(), null);
        assert.deepEqual(list.last(), null);
        assert.deepEqual(list.length, 0);
    });
    it('should not pop element from the end', function() {
        list.pop();
        list.pop();
        assert.deepEqual(list.first(), null);
        assert.deepEqual(list.last(), null);
        assert.deepEqual(list.length, 0);
    });
});

describe('shift()', function() {
    it('should delete an element from beginning of the list', function() {
        list.push(1);
        list.push(2);
        list.push(3);
        list.shift();
        assert.deepEqual(list.first(), 2);
        assert.deepEqual(list.last(), 3);
        assert.deepEqual(list.length, 2);
    });
    it('should delete two elements from beginning of the list', function() {
        list.shift();
        list.shift();
        assert.deepEqual(list.first(), null);
        assert.deepEqual(list.last(), null);
        assert.deepEqual(list.length, 0);
    });
    it('should not delete two elements from beginning of the list', function() {
        list.shift();
        list.shift();
        assert.deepEqual(list.first(), null);
        assert.deepEqual(list.last(), null);
        assert.deepEqual(list.length, 0);
    });
});

describe('unshift()', function() {
    it('should insert an Array in the beginning', function() {
        list.unshift([2, 4, 5]);
        assert.deepEqual(list.first(), [2, 4, 5]);
        assert.deepEqual(list.last(), [2, 4, 5]);
        assert.deepEqual(list.length, 1);
    });

    it('should insert an string in the beginning', function() {
        list.unshift('zhang');
        assert.deepEqual(list.first(), 'zhang');
        assert.deepEqual(list.last(), [2, 4, 5]);
        assert.deepEqual(list.length, 2);
    });

    it('should not insert an null in the beginning', function() {
        list.unshift(null);
        assert.deepEqual(list.first(), 'zhang');
        assert.deepEqual(list.last(), [2, 4, 5]);
        assert.deepEqual(list.length, 2);
    });
});

describe('forEach()', function() {
    var list2 = new LinkedList();

    it("copy each element from list to list2", function() {
        // parameters: element, idx, array
        list.forEach(function(element) {
            list2.push(element);
        });

        assert.deepEqual(list2.first(), 'zhang');
        assert.deepEqual(list2.last(), [2, 4, 5]);
        assert.deepEqual(list2.length, 2);
    });
});
