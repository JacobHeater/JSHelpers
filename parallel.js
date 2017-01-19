(function() {
    
    'use strict';


    /**
     * Executes the given tasks in parallel fashion without regard to task order
     * and puts any output into a output array.
     * 
     * @param {Function[]} tasks The tasks to run in parallel.
     * @returns {Object} An object that exposes a setter for a complete function.
     */
    function parallel(tasks) {
        var complete = function noop() { };
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
                if (nDoneTasks === nTasks) {
                    complete(output);
                }
            }
        }
        return {
          done: function setComplete(fn) {
            if (typeof fn === 'function') {
              complete = fn;   
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
    }

})();
