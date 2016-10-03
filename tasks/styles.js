import gulp from 'gulp';
import {styles} from './config.js';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import {browserSync} from './config.js';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';

let outputStyle = 'compressed';

gulp.task('styles', stylesTask);

function stylesTask() {
  gulp
    .src(styles.src)
    .pipe(plumber({errorHandler}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle}))
    .pipe(autoprefixer())
    .pipe(rename('flexbox-layout.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(styles.dest))
    .pipe(browserSync.stream({match: '**/*.css'}));
}

function errorHandler(err) {
  let message = new gutil.PluginError('gulp-sass', err.messageFormatted).toString();
  process.stderr.write(message + '\n');
  gutil.beep();
};