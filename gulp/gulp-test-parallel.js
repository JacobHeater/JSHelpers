(() => {

    'use strict';

    const gulp = require('gulp');
    const jasmine = require('gulp-jasmine');

    gulp.task('test-parallel', () => gulp.src('spec/parallel.js')
        .pipe(jasmine()));

})();