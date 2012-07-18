var humbug = require('../');
var fs = require('fs');

(function (x) {
    var z = 33;
    (function (w) {
        var y = 222222;
        fs.createReadStream('in.txt')
            .pipe(eval(humbug))
            .pipe(fs.createWriteStream('out.txt'))
        ;
    })(1111);
})(5555)
