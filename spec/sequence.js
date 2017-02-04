(() => {

    'use strict';

    const sequence = require('../src/sequence.js');
    const vars = require('./vars.js');

    var asyncOutput = '';
    var sequenceOutput = '';

    describe('Sequence Task Order Assurance', () => {

        beforeEach(go => {
            //We have to reset this back to default before each test run.
            sequenceOutput = '';

            sequence([
                done => {
                    setTimeout(() => {
                        done(vars.HELLO);
                    }, 10);
                },
                done => {
                    setTimeout(() => {
                        done(vars.WORLD);
                    }, 0);
                }
            ]).done(val => {
                sequenceOutput = val;
                go();
            });

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

        it('Runs synchronous tasks in order providing the output from each prior task', () => {
            var output = '';

            sequence([
                (done, data) => {
                    expect(data.length).toEqual(0);
                    done(vars.HELLO);
                },
                (done, data) => {
                    expect(data[0]).toEqual(vars.HELLO);
                    done(vars.WORLD);
                },
                (done, data) => {
                    expect(data[1]).toEqual(vars.WORLD);
                    done();
                }
            ], data => expect(data.join('')).toEqual(vars.HELLO_WORLD));
        });

        it('Runs asynchronous tasks in order, and produces expected output', () => {

            expect(sequenceOutput.join('')).toEqual(vars.HELLO_WORLD);

        });
    });

})();