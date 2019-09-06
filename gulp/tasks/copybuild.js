module.exports = function () {
    $.gulp.task('copybuild', () => {
        return $.gulp.src('./build/**')
            .pipe($.gulp.dest('../web/site/html/'));
    });
};