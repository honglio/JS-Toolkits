var assert = require('assert');
var MultiMap = require('../script/datastructures/MultiMap');

var map = new MultiMap();

describe('put()', function() {
    it('should insert three pairs, value is number', function() {
        map.put('key1', 1);
        map.put('key1', 0);
        map.put('second', 2);
    });

    it('Allows null and undefined values', function() {
        map.put('some', null);
        assert.deepEqual(map.get('some'), [null]);
        map.put('some', undefined);
        assert.deepEqual(map.get('some'), [null, undefined]);
    });

    it('Will allow duplicate values', function() {
        map.put('foo', 'bar');
        map.put('foo', 'bar');

        assert.deepEqual(map.get('foo'), ['bar', 'bar']);
    });
});

describe('putIfAbsent', function() {
    it('Provides putIfAbsent to only allow for distinct values under a key', function() {
        map.put('foo', 'baz');
        map.putIfAbsent('foo', 'baz');

        assert.deepEqual(map.get('foo'), ['bar', 'bar', 'baz']);
    });
});

describe('putAll()', function() {
    it('should insert an pair, value is number Array', function() {
        map.putAll('key1', [2, 3, 4, 5]);
    });
    it('should insert an pair, value is string Array', function() {
        map.putAll('cookies', ['oreo', 'peanut', 'sugar']);
    });
});

describe('get()', function() {
    it('gets number pair', function() {
        assert.deepEqual(map.get('second'), [2]);
    });

    it('Returns an array of values or emptry array on get', function() {
        assert.deepEqual(map.get('key2'), []);
    });

    it('Allows multiple values to associate to a single key', function() {
        assert.deepEqual(map.get('key1'), [1, 0, 2, 3, 4, 5]);
    });
});

describe('remove() & removeAll()', function() {
    it('Allows the removal of all values under a given key', function() {
        map.removeAll('key1');
        assert.deepEqual(map.get('key1'), []);
    });

    it('Removes the key when all its values are removed', function() {
        map.remove('second', 2);
        assert.deepEqual(map.get('second'), []);
    });

    it('Allows the removal of single values under a given key', function() {
        map.remove('cookies', 'peanut');
        assert.deepEqual(map.get('cookies'), ['oreo', 'sugar']);
    });
});
