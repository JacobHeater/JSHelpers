(() => {

    'use strict';

    const HELLO = "Hello, ";
    const WORLD = "world!";
    const HELLO_WORLD = `${HELLO}${WORLD}`;
    const WORLD_HELLO = `${WORLD}${HELLO}`;


    module.exports = {
        get HELLO() {
            return HELLO;
        },
        get WORLD() {
            return WORLD;
        },
        get HELLO_WORLD() {
            return HELLO_WORLD;
        },
        get WORLD_HELLO() {
            return WORLD_HELLO;
        }
    };

})();