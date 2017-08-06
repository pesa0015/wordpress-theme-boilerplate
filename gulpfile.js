'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

gulp.task('js', function() {
    return gulp.src('build/js/*.js')
        .pipe(uglify())
        .pipe(concat('dist.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('css', function() {
    return gulp.src('build/sass/main.scss')
        .pipe(sass()).pipe(minifyCSS())
        .pipe(concat('dist.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('theme', function() {
    return gulp.src(['theme-info.css', 'css/dist.min.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    runSequence('css', 'js', 'theme');
    watch(['build/sass/*.scss', 'theme-info.css'], function() {
        runSequence('css', 'theme');
    });
    watch('build/js/*.js', function() {
        runSequence('js');
    });
});
