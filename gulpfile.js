var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
	gulp.src([
			'public/js/**',
			'server/**',
			'!public/build/*.js',
			'!public/js/libs/**'
		])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('less', function() {
	gulp.src('public/css/imports.less')
		.pipe(less({
			paths: ['public/css/']
		}))
		.pipe(minifyCSS())
		.pipe(rename('combined.css'))
		.pipe(gulp.dest('public/build/'));
});

gulp.task('develop', function () {
	nodemon({
		script: 'app.js',
		options: ''
	});
});

gulp.task('default', function() {
	gulp.run('develop');

	gulp.watch(['public/js/**', 'server/**'], function() {
		gulp.run('lint');
	});

	gulp.watch('public/css/**', function() {
		gulp.run('less');
	});
});