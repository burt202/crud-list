var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    jeditor = require('gulp-json-editor'),
    shell = require('gulp-shell');

gulp.task('default', function () {
    gulp.run('init');

    gulp.watch('public/css/**', function () {
        gulp.run('compile-less');
    });
});

gulp.task('init', function () {
    nodemon({
        script: 'app.js',
        ext: 'js json'
    })
    .on('change', ['jshint']);
});

gulp.task('build', function () {
    gulp.run('compile-less', 'bundle-js', 'type-production');
});

gulp.task('unbuild', function () {
    gulp.run('type-development');
});

gulp.task('coverage', function () {
    gulp.src('')
        .pipe(shell('./node_modules/istanbul/lib/cli.js cover -x **/node_modules/** -x **/public/bower_components/** --hook-run-in-context --report html --print both ./node_modules/mocha/bin/_mocha -- --recursive tests/client/app/'))
        .on('finish', function () {
            console.log('Breakdown: file://' + __dirname + '/coverage/index.html');
        });
});

gulp.task('client-tests', shell.task([
    './node_modules/mocha/bin/_mocha --reporter=spec --recursive tests/client/app/**'
]));

gulp.task('api-tests', shell.task([
    './node_modules/mocha/bin/_mocha --reporter=spec --recursive tests/api/**'
]));

gulp.task('ui-tests', shell.task([
    './node_modules/dalek-cli/bin/cmd.js tests/ui/*js'
]));

gulp.task('jshint', function () {
    gulp.src([
            'public/js/**',
            'server/**',
            'tests/**'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('compile-less', function () {
    gulp.src('public/css/imports.less')
        .pipe(less({
            paths: ['public/css/'],
            compress: true
        }))
        .pipe(rename('combined.css'))
        .pipe(gulp.dest('public/build/'));
});

gulp.task('type-production', function () {
    gulp.src('configs/app.json')
        .pipe(jeditor(function (json) {
            json.type = 'production';
            return json;
        }))
        .pipe(gulp.dest('configs/'));
});

gulp.task('type-development', function () {
    gulp.src('configs/app.json')
        .pipe(jeditor(function (json) {
            json.type = 'development';
            return json;
        }))
        .pipe(gulp.dest('configs/'));
});

gulp.task('bundle-js', shell.task([
    'node public/bower_components/rjs/dist/r.js -o public/build/build.json > public/build/build.js.log'
]));
