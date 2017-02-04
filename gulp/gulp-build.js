(() => {

    'use strict';

    const gulp = require('gulp');
    const uglify = require('gulp-uglify');
    const rename = require('gulp-rename');
    const util = require('gulp-util');

    gulp.task('build', () => {
        gulp
            .src('src/*.js')
            .pipe(uglify({
                preserveComments: 'license'
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('./bin'));
    });

})();