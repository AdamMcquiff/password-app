const gulp = require('gulp')
const sass = require('gulp-sass') 
const cssnano = require('gulp-cssnano')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(cssnano())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
})
 
gulp.task('js', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
})

gulp.task('sass:watch', () => {
  gulp.watch('./src/sass/**/*.scss', ['sass'])
})