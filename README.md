# JS Helpers ![](https://api.travis-ci.org/JacobHeater/JSHelpers.svg?branch=master)

The purpose of the JSHelpers library is provide a common repository of JavaScript helper
functions that make programming in JavaScript more efficient. The helpers and their purposes
can be found listed out below. 

## sequence.js
---

The `sequence` helper function is intended to provide a mechanism to ensure
that a set of functions get called in the order that they are specified.
This is especially helpful for when you have multiple asynchronous operations
that you can't ensure will occur in any specific order. One example of such
scenario would be in the case of `XmlHttpRequest` or `AJAX`, where you can't
determine when a server will respond.

Consider the following scenario:

We have two `XmlHttpRequest`s. For simplicity's sake, we'll call them `A` and
`B`. `B` depends on `A`, and we need to ensure that `A` is done before we can
call `B`. If we were using jQuery AJAX, we could structure our requests to look
like so to achieve what we're descibing.

```javascript
(() => {
    
    'use strict';

     $.when($.get('path/to/A'))
      .then(a => {
          //A is done
          $.get('path/to/B')
           .then(b => {
               //B is done
               //Give back A and B
               doneAandB(a[0], b);
           });
      });

     function doneAandB(a, b) {
         //Do stuff here...
     }

})();

```
The above illustration shows a pretty common workflow with `XmlHttpRequest`.
This is pretty well documented, however, I just find this to be too
unreadable. The indentation alone starts to get hard to follow. Using 
`sequence` we could greatly simplify that workflow into more readable code.

```javascript
(() => {

    'use strict';

    sequence([
        //Add the data from A into the output array by calling
        //done(data).
        done => $.get('path/to/A').then(data => done(data)),
        //Add the data from B into the output array by calling
        //done(data).
        done => $.get('path/to/B').then(data => done(data))
    ])
    //data will be an array, so call apply
    .done(data => doneAandB.apply(null, data));

    function doneAandB(a, b) {
        //Do stuff here...
    }

})();
```

Using sequence we can simplify the code and make it more readable, while
still achieving the same result.

## parallel.js
---

The `parallel` helper function provides a clean mechanism of running tasks
in parallel, and creating an output array that contains all of the data from
those tasks in the **order they were executed**. Unline `sequence`, this helper
does not ensure the order of the tasks as they're listed. This helper is
primarily useful in cases where you have lots of asynchronous operations
occurring and you want to streamline the data output.

Here's an example below:

```javascript
(() => {

    'use strict';

    parallel([
        done => $.get('a').then(d => done(d)),
        done => $.get('b').then(d => done(d)),
        done => $.get('c').then(d => done(d))
        //etc..
    ]).done(data => {
        //Do stuff with the data array.
    });

})();
```

The above code syntatically looks very similary to the `sequence` code above.
There is one key difference in that the data that comes out of the `done`
callback will not necessarily be in the order that it was listed in the `task`
array. In our list of tasks, `a` comes before `b`, and `b`, comes before `c`.
The data that comes out of those tasks may not necessarily be `[a, b, c]`.
It could be `[b, c, a]`, or any variation of `N^N`. Therefore, it should never
be assumed that `parallel` will keep your tasks in order. If that is needed,
you should always use `sequence`.

## promise.js

The `$Promise` prototype was written for older environments that do not support
ES2015 or greater features. The intention of this helper is to create an
abstraction that assists in making asynchronous programming in JavaScript more
approachable and readable. The `$Promise` prototype behaves very similarly to
other implementations of promises in JavaScript. Once a `$Promise` is resolved,
it can no longer be used. The `$Promise` can either be resolved or rejected.
See the example below for usage examples.

```javascript
(() => {

    'use strict';

    fakeXhr()
        .then(d => console.log(d)); //logs 'Data'

    fakeBadXhr()
        .fail(d => console.log(d)); //logs 'something went wrong'

    function fakeXhr() {
        var promise = new $Promise();

        setTimeout(() => promise.resolve('Data'), 200);

        return promise;
    }

    function fakeBadXhr() {
        var promise = new $Promise();

        setTimeout(() => promise.reject('something went wrong'), 200);

        return promise;
    }

}();
```

## chunk.js

The `chunk` function is a helper function for breakign up arrays into 
smaller chunks based on the given chunk size. If the given array cannot
be divided evenly into equal chunks, the remaining chunks will be broken
into a smaller array.

```javascript
(() => {

    'use strict';

    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var chunked = chunk(arr, 3);
    //yields [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

    var chunked = chunk(arr, 4);
    //yields [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]]

})();
```

# TDD

I have written `gulp` tasks to wrap my `jasmine` tets. I have made every effort
to write meaningful, useful, tests to cover a few different scenarios. It would
be wise to write more tests against your use case if you find that there aren't
tests cases to cover your use case. 

Tests that can be run against the helpers are:

1. `gulp unit-test`^
1. `gulp test-*`^^

^`gulp unit-test` will run the full test suite against all test scenarios in the spec folder.
^^Denotes any test that has the name gulp-test-*.js in the file name.

# Distros

The minified files for each of the helpers can be found in the `bin` directory.
If you wish to minifiy the files yourself, you can run `gulp build`.