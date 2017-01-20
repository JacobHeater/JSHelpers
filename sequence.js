/*!

==========================================
===============             ==============
=============== sequence.js ==============
===============             ==============
==========================================

https://github.com/JacobHeater/JSHelpers

MIT License

Copyright (c) 2017 Jacob Heater

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function () {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define('sequence', function sequenceModule() {
            return sequence;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = sequence;
    } else if (typeof window !== 'undefined') {
        window.sequence = sequence;
    }

    /**
     * Runs the given array of tasks in order and ensures that
     * asynchronous tasks are done in the order they are given.
     * 
     * @param {Function[]} tasks   The tasks to run in sequential order.
     * 
     * @param {Function=} complete An optional function to set complete to
     *                             in the event that all tasks are synchronous.
     * 
     * @returns {Object}           An object that exposes a setter for the complete function.
     */
    function sequence(tasks, complete) {
        var _complete = isFunc(complete) ? complete : function noop() {};

        if (Array.isArray(tasks)) {
            //We need to make a copy so that we don't
            //inadvertently modify the array.
            tasks = tasks.slice(0).filter(isFunc);

            var output = [];
            var nTasks = tasks.length;
            var doneTasks = 0;

            tasks.forEach(function(t, i) {
                t(wrap(i), output);
            });

            /**
             * Creates a closure that tracks the index of the function that was called.
             * This ensures that the data that is added to the output array is added
             * in the order in which the function was called. The main benefit of this
             * approach is that we can still run the tasks in parallel, but ensure that
             * the data that they return is returned as if it was synchronous. This also
             * ensures that long running async operations won't tie up other tasks while
             * we're waiting for them to complete.
             * 
             * @param {Number} idx The index of the task being invoked.
             * 
             * @returns {Function} A callback for when the task is done.
             */
            function wrap(idx) {

                /**
                 * A callback for when the task is done running where the user can
                 * provide optional output from the task.
                 * 
                 * @param {any=} outVal The optional output of the task.
                 */
                return function done(outVal) {

                    output[idx] = outVal;
                    doneTasks++;

                    //If the total number of processed tasks === the total number
                    //of queued tasks, then we'll assume we're done here.
                    if (doneTasks === nTasks) {
                        _complete(output);
                    }
                };
            }
        }

        return {
            /**
             * A setter to set the complete function when all tasks have been
             * processed.
             * 
             * @param {Function} fn The function to set complete to.
             * 
             * @returns {Object}    The current object instance.
             */
            done: function setComplete(fn) {
                if (isFunc(fn)) {
                    _complete = fn;
                }
                return this;
            }
        };
    }

    /**
     * Determines if the given object is a function.
     * 
     * @param {any} fn The object to check the type of.
     * 
     * @returns {Boolean}
     */
    function isFunc(fn) {
        return typeof fn === 'function';
    }

})();