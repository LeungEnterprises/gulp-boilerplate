const gulp = require('gulp');
const path = require('path');
const plumber = require('gulp-plumber');

const jade = require('gulp-jade');
const stylus = require('gulp-stylus');
const babel = require('gulp-babel');
const flatten = require('gulp-flatten');

const imagemin = require('gulp-imagemin');

const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const lazypipe = require('lazypipe');

const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');

const paths = {
  js: {
    watch: ['./src/js/**/*.js'],
    compile: ['./src/js/**/*.js'],
  },
  styl: {
    watch: ['./src/styl/**/*.styl'],
    compile: ['./src/styl/**/*.styl', '!./src/styl/utility.styl'],
  },
  jade: {
    watch: ['./src/**/*.jade'],
    compile: ['./src/**/*.jade', '!./src/_layout.jade', '!./src/_partials/**/*.jade'],
  },
  img: {
    watch: ['./src/img/**/*'],
    compile: ['./src/img/**/*'],
  },
  vendor: {
    watch: ['./src/vendor/**/*'],
    compile: ['./src/vendor/**/*'],
  },
};

/**
 * Build Tasks:
 * Initial compilation and copying only
 */

gulp.task('jade', () => {
  return gulp.src(paths.jade.compile)
    .pipe(plumber())
    .pipe(jade({
      basedir: path.join(__dirname, 'src'),
      pretty: true
    }))
    .pipe(gulp.dest('./build'));
})

gulp.task('stylus', () => {
  return gulp.src(paths.styl.compile)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('babel', () => {
  return gulp.src(paths.js.compile)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('copy-img', () => {
  return gulp.src(paths.img.compile)
    .pipe(gulp.dest('./build/img'));
});

// Copies all fonts into the `build/fonts` directory
gulp.task('flatten-fonts', () => {
  return gulp.src(['./src/vendor/**/*.{eot,svg,ttf,woff,woff2}', '!./src/vendor/Ionicons/src/*'])
    .pipe(flatten())
    .pipe(gulp.dest('./build/fonts'));
});

// Copies the `vendor` directory into the `build` directory
gulp.task('copy-vendor', () => {
  return gulp.src(paths.vendor.compile)
    .pipe(gulp.dest('./build/vendor'));
});

gulp.task('build', ['jade', 'stylus', 'babel', 'copy-img', 'flatten-fonts', 'copy-vendor'], () => {
});

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.jade.watch, ['jade']);
  gulp.watch(paths.styl.watch, ['stylus']);
  gulp.watch(paths.js.watch, ['babel']);

  gulp.watch(paths.img.compile, ['copy-img']);
  gulp.watch(paths.vendor.compile, ['flatten-fonts', 'copy-vendor']);

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

// Copy the js files that won't be useref'd
gulp.task('copy-custom-vendor', () => {
  /*
  return gulp.src('./src/vendor/path/to/file')
    .pipe(gulp.dest('./dist/vendor/path/to/file'));
  */
});

gulp.task('useref', () => {
  const cssTasks = lazypipe()
    .pipe(cssnano, { discardComments: {removeAll: true} });

  const jsTasks = lazypipe()
    .pipe(uglify);

  return gulp.src('./build/**/*.html')
    .pipe(useref())
      .pipe(gulpif('*.css', cssTasks()))
      .pipe(gulpif('*.js', jsTasks()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('produce', ['imagemin', 'copy-fonts', 'copy-custom-vendor', 'useref'], () => {
});
