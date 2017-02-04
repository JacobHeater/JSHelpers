(function() {
    
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define('chunk', function chunkModule() {
            return chunk;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = chunk;
    } else if (typeof window !== 'undefined') {
        window.chunk = chunk;
    }


    /**
     * Breaks up the array into smaller chunks based on the chunk size, and
     * will add any remaining straggling items into another array of a smaller size.
     * 
     * @param {any[]} array The array to break up into chunks.
     * @param {Number} size The size to chunk the array into.
     * 
     * @return {ChunkedArray|any} The chunked array, or if array is not an array, it returns
     *                            array back to the caller.
     */
    function chunk(array, size) {
        //We should only chunk if the array is an array, and length > 0, and size is a number.
        if (Array.isArray(array) && array.length && typeof size === 'number') {
            //Call .slice(0) to create a copy of the array.
            var copy = array.slice(0);
            var output = [];

            //We'll use .splice() to pull items out of the array to reduce the array.
            //Eventually the length of the copy array will be reduced to 0.
            while (copy.length) {
                //We'll push items to the output array between 0 and the end of the chunk size.
                output.push(copy.splice(0, size));
            }

            return output;
        }
        return array;
    }


})();
