/*module.exports = function () {
    $.gulp.task('copy', function () {
        return gulp.src([
            './build/*'
        ],  {base: './build/'})
            .pipe(gulp.dest('./tudom/'));
    })
};*/
/*
gulp.task('copy',function(){
    return gulp.src([
        './build/*'
    ],  {base: './build/'})
        .pipe(gulp.dest('./tudom/'));
});*/

module.exports = function () {
    $.gulp.task('copybuild', () => {
        return $.gulp.src('./build/**')
            .pipe($.gulp.dest('../siteback/html/'));
    });
};