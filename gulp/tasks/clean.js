module.exports = function () {
    $.gulp.task('clean', function () {
        return $.del('./build')
    })
    $.gulp.task('clean:copybuild', function () {
        return $.del('../siteback/html', {force:true});
    })
};