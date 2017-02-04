(() => {

    'use strict';

    const $Promise = require('../src/promise.js');
    const vars = require('./vars.js');
    const FAIL_MSG = 'Whoops!';

    let output = '';
    let failOutput = '';

    describe('Parallel Task Running Tests', () => {

        beforeEach(go => {
            output = ''; //reset to default.

            let promise = new $Promise();

            setTimeout(function() {
                promise.resolve(vars.HELLO);
            }, 100);

            promise.then(function(val) {
                output += val;
                let promise = new $Promise();

                setTimeout(function() {
                    promise.resolve(vars.WORLD);
                }, 0);

                promise.then(function(val) {
                    output += val;
                });
            });

            let errPromise = new $Promise();

            setTimeout(function() {
                errPromise.reject(FAIL_MSG);
            }, 400);

            errPromise.then(function() {
                output += FAIL_MSG;
            });

            errPromise.fail(function(val) {
                failOutput += val;
                go();
            });
        });

        it('Should resolve the promise and the output should equal vars.HELLO_WORLD', () => {
            expect(output).toEqual(vars.HELLO_WORLD);
            expect(failOutput).toEqual(FAIL_MSG);
        });

    });

})();
