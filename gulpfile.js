var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	nodemon = require('gulp-nodemon'),
	jeditor = require('gulp-json-editor'),
	shell = require('gulp-shell'),
	jasmineNode = require('gulp-jasmine');

gulp.task('default', function() {
	gulp.run('init');

	gulp.watch('public/css/**', function() {
		gulp.run('compile-less');
	});
});

gulp.task('init', function () {
	nodemon({
		script: 'app.js',
		ext: 'js json'
	}).on('change', ['jshint']);
});

gulp.task('build', function () {
	gulp.run('bundle-js', 'type-production');
});

gulp.task('unbuild', function () {
	gulp.run('type-development');
});

gulp.task('client-tests', function() {
	gulp.src('tests/client/**')
	.pipe(jasmineNode({
		verbose: true
	}));
});

gulp.task('api-tests', function() {
	gulp.src('tests/api/**')
	.pipe(jasmineNode({
		verbose: true
	}));
});

gulp.task('jshint', function() {
	gulp.src([
			'public/js/**',
			'server/**',
			'tests/**',
			'!public/build/*.js'
		])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('compile-less', function() {
	gulp.src('public/css/imports.less')
		.pipe(less({
			paths: ['public/css/']
		}))
		.pipe(minifyCSS())
		.pipe(rename('combined.css'))
		.pipe(gulp.dest('public/build/'));
});

gulp.task('type-production', function() {
	gulp.src('configs/app.json')
		.pipe(jeditor(function(json) {
			json.type = 'production';
			return json;
		}))
		.pipe(gulp.dest('configs/'));
});

gulp.task('type-development', function() {
	gulp.src('configs/app.json')
		.pipe(jeditor(function(json) {
			json.type = 'development';
			return json;
		}))
		.pipe(gulp.dest('configs/'));
});

gulp.task('bundle-js', shell.task([
	'node public/build/r.js -o public/build/build.json'
]));