(() => {

    'use strict';

    const sequence = require('../sequence.js');
    const vars = require('./vars.js');
    
    var asyncOutput = '';
    var sequenceOutput = '';

    describe('Sequence Task Order Assurance', () => {

        beforeEach(go => {
            //We have to reset this back to default before each test run.
            asyncOutput = '';
            sequenceOutput = '';
            
            sequence([
                done => {
                    setTimeout(() => {
                        asyncOutput += vars.HELLO;
                        done(vars.HELLO);
                    }, 10);
                },
                done => {
                    setTimeout(() => {
                        asyncOutput += vars.WORLD;
                        done(vars.WORLD);
                        go();
                    }, 0);
                }
            ], val => sequenceOutput = val);
        });

        it('Runs synchronous tasks in order, and produces expected output', () => {
            var output = '';

            sequence([
                done => {
                    output += vars.HELLO;
                    done();
                },
                done => {
                    output += vars.WORLD;
                    done();
                }
            ]);

            expect(output).toEqual(vars.HELLO_WORLD);
        });

        it('Runs asynchronous tasks in order, and produces expected output', () => {

            expect(asyncOutput).toEqual(vars.HELLO_WORLD);
            expect(sequenceOutput.join('')).toEqual(vars.HELLO_WORLD);

        });
    });

})();