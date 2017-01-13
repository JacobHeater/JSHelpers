(() => {

    'use strict';

    const gulp = require('gulp');
    const jasmine = require('gulp-jasmine');

    gulp.task('test-sequence', () => gulp.src('spec/sequence.js')
        .pipe(jasmine()));

})();