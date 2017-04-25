var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var del          = require('del');
var Server       = require('karma').Server;
var gulpDocs     = require('gulp-ngdocs');
var connect      = require('gulp-connect');

gulp.task('scss', function() {
    return gulp.src('src/notifyMe.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('notify-me.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('scripts', function() {
    return gulp.src(['src/notifyMe.js', 'src/**/*.js'])
        .pipe(concat('notifyMe.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/notifyMe.scss', ['scss']);
});

gulp.task('clean', function() {
    del('build');
});

gulp.task('build', ['clean', 'scss', 'scripts']);

gulp.task('test', startTest(true));

gulp.task('test:watch', startTest(false));

gulp.task('ngdocs', [], function () {
    var options = {
        html5Mode: true,
        startPage: '/api/notifyMe.notifyMe',
        title: "notifyMe Docs",
        titleLink: "/api/notifyMe"
    };
    return gulp.src('src/*.js')
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
});

gulp.task('run:ngdocs', function() {
    connect.server({
        root: 'docs',
        livereload: false,
        fallback: 'docs/index.html',
        port: 8083
    });
});

function startTest(singleRun) {
    return function (done) {
        new Server({
            configFile: __dirname + '/karma.conf.js',
            singleRun: singleRun
        }, done).start();
    }
}