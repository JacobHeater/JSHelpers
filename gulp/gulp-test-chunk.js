(() => {

    'use strict';

    const gulp = require('gulp');
    const jasmine = require('gulp-jasmine');

    gulp.task('test-chunk', () => gulp.src('spec/chunk.js')
        .pipe(jasmine()));

})();