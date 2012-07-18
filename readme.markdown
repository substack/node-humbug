# humbug

Debug inline state with a streaming repl.

# example

## open a repl for some nested state

``` js
var humbug = require('humbug');

(function (x) {
    var z = 33;
    (function (w) {
        var y = 222222;
        eval(humbug);
    })(1111);
})(5555)
```

```
 $ node example/debug.js 
> x
5555
> y
222222
> z * 1000
33000
> 
```

## stream a repl

```
var humbug = require('humbug');
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
```

input file:

```
x
y + z
```

output file:

```
> 5555
> 222255
> 
```

# methods

There are no methods! This module just exports a string that you can `eval()`
whenever you want to make a new repl. This is the only way I can think of to
easily get at local variables.

``` js
var humbug = require('humbug')
```

## eval(humbug)

Create a repl at the present context.

Returns a readable/writable repl stream so you can pipe this over the network or
to a browser.

If you don't `.pipe()` to the repl stream by the nextTick, `process.stdin` will
be used.

If you don't `.pipe()` from the repl stream by the nextTick, `process.stdout`
will be used.

# install

With [npm](http://npmjs.org) do:

```
npm install humbug
```

# license

MIT
