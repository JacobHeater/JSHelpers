(function () {

    'use strict';

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
        var _complete = typeof complete === 'function' ? complete : function noop() {};

        if (Array.isArray(tasks)) {
            //We need to make a copy so that we don't
            //inadvertently modify the array.
            tasks = tasks.slice(0).filter(function (t) {
                return typeof t === 'function';
            });

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

                if (currentTask) {
                    currentTask(done, output);
                } else if (!tasks.length) {
                    _complete(output);
                }
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
                if (typeof fn === 'function') {
                    _complete = fn;
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
    } else if (typeof window !== 'undefined') {
        window.sequence = sequence;
    }

})();