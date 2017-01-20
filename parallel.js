(function () {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define('parallel', function parallelModule() {
            return parallel;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = parallel;
    } else if (typeof window !== 'undefined') {
        window.parallel = parallel;
    }


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
        var _complete = isFunc(complete) ? complete : function noop() {};

        if (Array.isArray(tasks)) {
            //Make sure we only deal with functions.
            tasks = tasks.filter(isFunc);

            var output = [];
            var nTasks = tasks.length;
            var nDoneTasks = 0;

            tasks.forEach(function (t) {
                t(done, output);
            });

            /**
             * A callback for when a task is done processing. This
             * callback causes the task processor to queue up the next
             * tasks and being processing it.
             * 
             * @param {any=} outVal An optional data value to add to the output array.
             */
            function done(outVal) {
                if (outVal) {
                    //If the task returned any data, put it in the output array.
                    output.push(outVal);
                }
                //Increment the processed task count.
                nDoneTasks++;
                //If the number of done tasks is equal to the total number of tasks,
                //it is logical to assume we are done processing all tasks.
                if (nDoneTasks === nTasks) {
                    //Notify that we are done.
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