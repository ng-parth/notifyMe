var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');

var autoPrefixer = require('gulp-autoprefixer');


gulp.task('scss', function() {
    return gulp.src('src/notifyMe.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
        }))
        .pipe(rename('notify-me.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('scss:min', function() {
    var minify = require('gulp-minify-css');
    return gulp.src('src/notifyMe.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
        }))
        .pipe(rename('notify-me.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('build'));
});


gulp.task('scripts', function() {
    return gulp.src(['src/notifyMe.js', 'src/**/*.js'])
        .pipe(concat('notifyMe.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('scripts:min', function() {
    var uglify = require('gulp-uglify');
    return gulp.src(['src/notifyMe.js', 'src/**/*.js'])
        .pipe(concat('notifyMe.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/notifyMe.scss', ['scss']);
});

gulp.task('clean', function() {
    var del = require('del');
    del('build');
    // del('docs');
});

gulp.task('build', ['clean', 'scss', 'scripts', 'buildDocs']);

gulp.task('test', startTest(true));

gulp.task('test:watch', startTest(false));

gulp.task('buildDocs', [], function () {
    var gulpDocs = require('gulp-ngdocs');
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

gulp.task('runDocs', function() {
    var connect = require('gulp-connect');
    connect.server({
        root: 'docs',
        livereload: false,
        fallback: 'docs/index.html',
        port: 8083
    });
});

function startTest(singleRun) {
    var Server = require('karma').Server;
    return function (done) {
        new Server({
            configFile: __dirname + '/karma.conf.js',
            singleRun: singleRun
        }, done).start();
    }
}