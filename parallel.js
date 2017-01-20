(function () {

    'use strict';


    /**
     * Executes the given tasks in parallel fashion without regard to task order
     * and puts any output into a output array.
     * 
     * @param {Function[]} tasks   The tasks to run in parallel.
     * 
     * @param {Function=} complete An optional function to set complete to
     *                             in the event that all tasks are synchronous.
     * 
     * @returns {Object}           An object that exposes a setter for a complete function.
     */
    function parallel(tasks, complete) {
        var _complete = typeof complete === 'function' ? complete : function noop() {};
        if (Array.isArray(tasks)) {
            //Make sure we only deal with functions.
            tasks = tasks.filter(function (t) {
                return typeof t === 'function';
            });

            var output = [];
            var nTasks = tasks.length;
            var nDoneTasks = 0;
            tasks.forEach(function (t) {
                t(done, output);
            });

            function done(outVal) {
                if (outVal) {
                    output.push(outVal);
                }
                nDoneTasks++;
                if (nDoneTasks === nTasks) {
                    _complete(output);
                }
            }
        }

        return {
            done: function setComplete(fn) {
                if (typeof fn === 'function') {
                    _complete = fn;
                }
                return this;
            }
        };
    }


    if (typeof define === 'function' && define.amd) {
        define('parallel', function parallelModule() {
            return parallel;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = parallel;
    } else if (typeof window !== 'undefined') {
        window.parallel = parallel;
    }

})();