(function () {

    'use strict';

    /**
     * Runs the given array of tasks in order and ensures that
     * asynchronous tasks are done in the order they are given.
     * 
     * @param {Function[]} tasks The tasks to run in sequential order.
     * @returns {Object} An object that exposes a setter for the done function.
     */
    function sequence(tasks) {
        var done = function noop() { };
        if (Array.isArray(tasks)) {
            //We need to make a copy so that we don't
            //inadvertently modify the array.
            tasks = tasks.slice(0);
            var output = [];
            iterate();

            function done(outVal) {
                if (outVal) {
                    output.push(outVal);
                }
                iterate();
            }

            function iterate() {
                var currentTask = tasks.shift();

                if (typeof currentTask === 'function') {
                    currentTask(done);
                } else if (!tasks.length) {
                    done(output);
                }
            }
        }
        
        return {
          done: function setDone(fn) {
              if (typeof fn === 'function') {
                done = fn;   
              }
              return this;
          }
        };
    }

    if (typeof define === 'function' && define.amd) {
        define('sequence', function sequenceModule() {
            return sequence;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = sequence;
    }

})();
