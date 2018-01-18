const gulp = require('gulp')
const sass = require('gulp-sass') 
const cssnano = require('gulp-cssnano')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const livereload = require('gulp-livereload')
const browserSync = require('browser-sync').create()

gulp.task('sass', () => {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(cssnano())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())
        .pipe(livereload())
})
 
gulp.task('js', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
        .pipe(livereload())
})

gulp.task('sass:watch', () => {
    gulp.watch('./src/sass/**/*.scss', ['sass'])
})

gulp.task('watch', () => {
    browserSync.init({
        proxy: 'http://127.0.0.1:8080/',
    })
    livereload.listen()
    gulp.watch('./src/sass/**/*.scss', ['sass'])
    gulp.watch('./src/js/**/*.js', ['js'])
    gulp.watch('**/*.html', () => {
        gulp.src('**/*.html')
            .pipe(browserSync.stream())
            .pipe(livereload())
    })
})
