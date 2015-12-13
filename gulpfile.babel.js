import gulp from 'gulp';
import plumber from 'gulp-plumber';

import jade from 'gulp-jade';
import stylus from 'gulp-stylus';
import babel from 'gulp-babel';
import flatten from 'gulp-flatten';

import imagemin from 'gulp-imagemin';

import usemin from 'gulp-usemin';
import gulpif from 'gulp-if';

import autoprefixer from 'gulp-autoprefixer';
import minifyCss from 'gulp-minify-css';
import uglify from 'gulp-uglify';

/**
 * Build Tasks:
 * Initial compilation and copying only
 */

gulp.task('jade', () => {
  return gulp.src(['./src/**/*.jade', '!./src/_partials/*.jade', '!./src/_layout.jade'])
    .pipe(plumber())
    .pipe(jade({
      basedir: './src',
      pretty: true
    }))
    .pipe(gulp.dest('./build'));
})

gulp.task('stylus', () => {
  return gulp.src('./src/css/index.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('babel', () => {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('copy-img', () => {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./build/img'));
});

// Copies all fonts into the `build/fonts` directory
gulp.task('copy-fonts', () => {
  return gulp.src(['./src/vendor/**/*.{eot,svg,ttf,woff,woff2}', '!./src/vendor/Ionicons/src/*'])
    .pipe(flatten())
    .pipe(gulp.dest('./build/fonts'));
});

// Copies the `vendor` directory into the `build` directory
gulp.task('copy-vendor', () => {
  return gulp.src('./src/vendor/**/*')
    .pipe(gulp.dest('./build/vendor'));
});

gulp.task('build', ['jade', 'stylus', 'babel', 'copy-img', 'copy-fonts', 'copy-vendor'], () => {
});

gulp.task('dev', ['build'], () => {
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch('./src/css/*.styl', ['stylus']);
  gulp.watch('./src/js/*.js', ['babel']);

  gulp.watch('./src/img/**/*', ['copy-img']);
  gulp.watch('./src/vendor/**/*', ['fonts', 'copy-fonts', 'copy-vendor']);

  console.log("Watching files!");
});

/**
 * Produce Tasks:
 * Minification, optimization, etc.
 */

gulp.task('imagemin', () => {
  return gulp.src('./build/img/**/*')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-fonts', () => {
  return gulp.src('./build/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-vendor', () => {
  return gulp.src('./build/vendor/**/*')
    .pipe(gulp.dest('./dist/vendor'));
})

gulp.task('usemin', () => {
  return gulp.src('./build/**/*.html')
    .pipe(usemin({
      css: [ autoprefixer({ cascade: false }), minifyCss({ keepSpecialComments: 0 }) ],
      js: [ uglify() ]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('produce', ['imagemin', 'copy-fonts', 'copy-vendor', 'usemin'], () => {
});
