(() => {

    'ust strict';

    const chunk = require('../chunk.js');

    describe('The chunk function breaks arrays into smaller sizes', () => {

        it('Should break an array of 9 items into a chunked array of 3 arrays of 3 items', () => {
            var arr = createArray(9);
            var chunked = chunk(arr, 3);
            var lt3 = chunked.filter(c => c.length < 3);

            expect(arr.length).toEqual(9);
            expect(chunked.length).toEqual(3);
            expect(lt3.length).toEqual(0);
        });

        it('Should break an array of 10 items into a chunked array of 3 arrays of 3 items and 1 array of 1 item', () => {
            var arr = createArray(10);
            var chunked = chunk(arr, 3);
            var lt3 = chunked.filter(c => c.length < 3);

            expect(arr.length).toEqual(10);
            expect(chunked.length).toEqual(4);
            expect(lt3.length).toEqual(1);
        });

        it('Should not attempt to chunk an array that has zero items', () => {
            var arr = createArray(0);
            var chunked = chunk(arr, 3);

            /*
            Because the chunk function will return the same object back to us
            if the array doesn't have any items, we know that arr and chunked will
            point to the same object reference. Therefore, we know that it will be
            true if the chunk array didn't create a copy of the array.
            */
            expect(arr === chunked).toEqual(true);
        });

        it('Should not attempt to chunk an object that is not an array', () => {
            //We'll create an object that has a length property to ensure
            //that we cannot spoof the chunk function.
            var obj = {
                length: 3
            };

            var chunked = chunk(obj, 3);

            /*
            We know that chunked === obj will be true because chunk will pass
            back the same object reference if the object is not an array.
            */
            expect(chunked === obj).toEqual(true);
        });

        it('Should not attempt to chunk undefined if we provide no parameters', () => {
            /*
            We know that chunk will pass back whatever parameters we give, assuming that
            they do not meet the criteria to chunk the array. Given that we have provided
            undefined for the array parameter, we can expect the return value to be 
            undefined.
            */
            expect(typeof chunk()).toEqual('' + undefined);
        });

    });

    function createArray(nItems) {
        var arr = [];
        for (var i = 0; i < nItems; i++) {
            arr[i] = i;
        }
        return arr;
    }

})();