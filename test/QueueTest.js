var assert = require('assert');
var Queue = require('../script/datastructures/Queue');

var num = 3;
var a = 0;
var b = 0;

function StepCB() {
    return a += 1;
}

function CompleteCB() {
    return b += 99;
}

var queue = new Queue();

describe("decrement()", function() {
    it("allow enqueue object and function", function() {
        queue.enqueue(a);
        queue.enqueue(b);
        queue.enqueue(StepCB);
        queue.enqueue(CompleteCB);
    });
    it("allow take", function() {
        for (var i = num - 1; i >= 0; i -= 1) {
            queue.dequeue();
        }
    });
    it("should run CompleteCB", function() {
        assert.deepEqual((queue.dequeue())(), 99);
    });
});
