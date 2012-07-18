var test = require('tap').test;
var humbug = require('../');
var fs = require('fs');
var Stream = require('stream');

test('multi-line expressions', function (t) {
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
    
    input.emit('data', '{a:3,b:4}.\n');
    input.emit('data', 'a\n');
    input.emit('end');
    
    process.nextTick(function () {
        t.equal(data, '> ... \n3\n> ');
    });
});
