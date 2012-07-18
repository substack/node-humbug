var test = require('tap').test;
var humbug = require('../');
var fs = require('fs');
var Stream = require('stream');

test('streaming debugger', function (t) {
    t.plan(1);
    
    var input = new Stream;
    input.readable = true;
    
    var output = new Stream;
    output.writable = true;
    
    var data = '';
    output.write = function (buf) {
        data += buf
    };
    output.end = function () {};
    
    (function (x) {
        var z = 33;
        (function (w) {
            var y = 222222;
            input.pipe(eval(humbug)).pipe(output);
        })(1111);
    })(5555);
    
    input.emit('data', 'x\ny\nz\ny * 3 + z * 2\n');
    input.emit('end');
    
    process.nextTick(function () {
        t.equal(data, '> 5555\n> 222222\n> 33\n> 666732\n> ');
    });
});
