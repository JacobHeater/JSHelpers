(() => {

    'use strict';

    const gulp = require('gulp');
    const jasmine = require('gulp-jasmine');

    gulp.task('test-promise', () => gulp.src('spec/promise.js')
        .pipe(jasmine()));

})();