(() => {
    const fs = require('fs');
    const gulp = require('gulp');

    fs.readdirSync('gulp').filter(f => /gulp-.*\.js/.test(f)).forEach(f => require(`./gulp/${f}`));

    gulp.task('default', []);    
})();
