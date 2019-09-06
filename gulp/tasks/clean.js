module.exports = function () {
    $.gulp.task('clean', function () {
        return $.del('./build')
    })
    $.gulp.task('clean:copybuild', function () {
        return $.del('../web/site/html', {force:true});
    })
};