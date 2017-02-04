(() => {

    'use strict';

    const gulp = require('gulp');
    const gutil = require('gulp-util');
    const fs = require('fs');

    const files = fs.readdirSync('gulp').filter(f => f.match(/gulp-test/gi));

    const tasks = files.map(f => f.replace(/gulp-|\.js/gi, ''));

    gulp.task('unit-test', tasks);

})();