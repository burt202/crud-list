var fs = require('fs'),
	config = JSON.parse(fs.readFileSync(__dirname + '/configs/app.json', 'utf8')),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	nodemon = require('gulp-nodemon'),
	jeditor = require('gulp-json-editor'),
	shell = require('gulp-shell');

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
	gulp.run('compile-less', 'bundle-js', 'type-production');
});

gulp.task('unbuild', function () {
	gulp.run('type-development');
});

gulp.task('coverage', shell.task([
	'./node_modules/istanbul/lib/cli.js cover -x **/node_modules/** -x **/public/bower_components/** --hook-run-in-context --report html --print both ./node_modules/mocha/bin/_mocha -- --recursive tests/client/js/'
]));

gulp.task('client-tests', shell.task([
	'./node_modules/mocha/bin/_mocha --reporter=spec --recursive tests/client/js/**'
]));

gulp.task('api-tests', shell.task([
	'./node_modules/mocha/bin/_mocha --reporter=spec --recursive tests/api/**'
]));

gulp.task('jshint', function() {
	gulp.src([
			'public/js/**',
			'server/**',
			'tests/**'
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
	'node public' + config.rjsPath + ' -o public/build/build.json'
]));
