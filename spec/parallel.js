(() => {

    'use strict';

    const parallel = require('../parallel.js');
    const vars = require('./vars.js');

    var output = '';
    var parallelOutput = '';

    describe('Parallel Task Running Tests', () => {

        beforeEach(go => {
            output = ''; //reset to default.
            parallelOutput = '';

            parallel([
                done => {
                    setTimeout(() => {
                        done();
                        go();
                    }, 300);
                },
                done => {
                    setTimeout(() => {
                        output += vars.HELLO;
                        done(vars.HELLO);
                    }, 200);
                },
                done => {
                    setTimeout(() => {
                        output += vars.WORLD;
                        done(vars.WORLD);
                    }, 100);
                }
            ], val => parallelOutput = val);
        });

        it('Should run the given tasks parallely and get the expected output', () => {
            expect(output).toEqual(vars.WORLD_HELLO);
            expect(parallelOutput.length).toEqual(2);
        });

    });

})();