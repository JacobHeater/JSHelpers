(function() {
    
    'use strict';


    /**
     * Executes the given tasks in parallel fashion without regard to task order
     * and puts any output into a output array.
     * 
     * @param {Function[]} tasks The tasks to run in parallel.
     * @param {Function} complete A callback to get output when all tasks have finished running.
     */
    function parallel(tasks, complete) {
        if (Array.isArray(tasks)) {
            var output = [];
            var nTasks = tasks.length;
            var nDoneTasks = 0;
            tasks.forEach(function(t) {
                if (typeof t === 'function') {
                    t(done);
                }
            });

            function done(outVal) {
                if (outVal) {
                    output.push(outVal);
                }
                nDoneTasks++;
                if (nDoneTasks === nTasks && typeof complete === 'function') {
                    complete(output);
                }
            }
        }
    }


    if (typeof define === 'function') {
        define('parallel', function parallelModule() {
            return parallel;
        });
    } else if ('exports' in module) {
        module.exports = parallel;
    }

})();