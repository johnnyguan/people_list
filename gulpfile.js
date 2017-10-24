let gulp = require('gulp-help')(require('gulp')),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    runSequence = require('run-sequence'),
    autoPrefixer = require('gulp-autoprefixer');
/** 编译sass，自动加前缀*/
gulp.task('sass', 'convert sass to css', function () {
    return gulp.src('frontend/scss/**/*')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(gulp.dest('./frontend/css'));
})

gulp.task('sass:watch', 'watch sass change', function () {
    return gulp.watch('./frontend/scss/**/*.scss', ['sass']);
});

/** js使用babel*/
gulp.task('js', 'transform js with babel', function () {
    return gulp.src("./frontend/js/**/*.js")
        .pipe(babel())
        .pipe(browserify({
            insertGlobals : true
          }))
        .pipe(gulp.dest("frontend/es6js"));
})

gulp.task('js:watch', 'watch js change', function () {
    return gulp.watch("./frontend/js/**/*.js",['js']);
})

/** 执行默认任务 */
gulp.task('default', 'default task', function (cb) {
    runSequence('sass', 'sass:watch', 'js', 'js:watch', cb);
})