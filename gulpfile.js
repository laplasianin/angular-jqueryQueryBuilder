var gulp = require('gulp');
var gutil = require('gutil');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {
    gulp.src('./src/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));
});
