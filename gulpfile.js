var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var image = require('gulp-image');

gulp.task('jshint', function() {
  gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('copytable', function() {
     gulp.src('public/fixed-data-table-master/**/*')
     .pipe(gulp.dest('build/fixed-data-table-master'));
  });

  gulp.task('copyfonts', function() {
       gulp.src('public/fonts/**/*')
       .pipe(gulp.dest('build/fonts'));
    });

    gulp.task('copyjs', function() {
         gulp.src('public/js/**/*.jsx')
         .pipe(gulp.dest('build/js'));
      });

      gulp.task('copytemplates', function() {
           gulp.src('public/templates/*.jsx')
           .pipe(gulp.dest('build/templates'));
        });


gulp.task('image', function () {
  gulp.src('public/css/images/**/*')
    .pipe(image())
    .pipe(gulp.dest('build/css/images'));
});

gulp.task('scripts', function() {
  gulp.src(['public/js/**/*.js'])
  //  .pipe(concat('script.js'))
  .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
      console.log("Hello js.");
});

gulp.task('styles', function() {
  gulp.src(['public/css/*.css'])
    //.pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'));
      console.log("Hello css.");
});



gulp.task('htmlpage', function() {
  var htmlSrc = 'public/**/*.html',
      htmlDst = 'build';

  gulp.src(htmlSrc)
    //.pipe(changed(htmlDst))
  //  .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

gulp.task('default', ['copytable','copyfonts','copyjs','copytemplates','image','scripts', 'styles','htmlpage'], function() {

 console.log("Hello Gulp! You are mighty fine.");

 gulp.watch('public/*.html', function() {
   gulp.run('htmlpage');
 });

 // watch for JS changes
 gulp.watch('public/js/**/*', function() {
   gulp.run('jshint', 'scripts');
 });

 // watch for CSS changes
 gulp.watch('public/css/*.css', function() {
   gulp.run('styles');
 });


});
