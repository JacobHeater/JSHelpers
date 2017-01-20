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