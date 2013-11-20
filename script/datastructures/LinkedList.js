/**
 * Provides a double linked list
 *
 */

var LinkedList = module.exports = function() {
    this.head = this.tail = null;
    this.length = 0;
}
// Creates a new node and add it onto the end of the list.
LinkedList.prototype.push = function(value) {
    var newNode;
    newNode = {
        prev: null,
        next: null,
        value: value
    };
    if (this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    } else {
        this.head = this.tail = newNode;
    }
    this.length += 1;
    return this;
};
// Removes the last node from the end of the list and return its value.
LinkedList.prototype.pop = function() {
    var value;
    if (this.tail == null) {
        throw "List is empty";
    }
    value = this.tail.value;
    if (this.tail === this.head) {
        this.tail = this.head = null;
    } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
    }
    this.length -= 1;
    return value;
};
// Removes the first element from the list and return its value.
LinkedList.prototype.shift = function() {
    var value;
    if (this.head == null) {
        throw "List is empty";
    }
    value = this.head.value;
    if (this.tail === this.head) {
        this.tail = this.head = null;
    } else {
        this.head = this.head.next;
        this.head.prev = null;
    }
    this.length -= 1;
    return value;
};
// Creates a new node and add it onto the beginning of the list.
LinkedList.prototype.unshift = function(value) {
    var newNode;
    newNode = {
        prev: null,
        next: null,
        value: value
    };
    if (this.head) {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
    } else {
        this.head = this.tail = newNode;
    }
    this.length += 1;
    return this;
};

LinkedList.prototype.first = function() {
    return this.head.value;
};

LinkedList.prototype.last = function() {
    return this.tail.value;
};

LinkedList.prototype.forEach = function(cb) {
    var cursor, idx, _results;
    cursor = this.head;
    idx = 0;
    _results = [];
    while (cursor !== null) {
        cb(cursor.value, idx += 1, this);
        _results.push(cursor = cursor.next);
    }
    return _results;
};
