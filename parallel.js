(function() {
    
    'use strict';


    /**
     * Executes the given tasks in parallel fashion without regard to task order
     * and puts any output into a output array.
     * 
     * @param {Function[]} tasks The tasks to run in parallel.
     * @returns {Object} An object that exposes a setter for a done function.
     */
    function parallel(tasks) {
        var done = function noop() { };
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
        define('parallel', function parallelModule() {
            return parallel;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = parallel;
    }

})();
