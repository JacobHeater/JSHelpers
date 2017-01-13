(() => {

    'use strict';

    const gulp = require('gulp');
    const gutil = require('gulp-util');
    const sequence = require('../sequence.js');

    gulp.task('unit-test', ['test-sequence', 'test-parallel']);

})();