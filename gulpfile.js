//  /////////////////////////////////////////
// Required
//  ////////////////////////////////////////

var gulp = require('gulp'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//  /////////////////////////////////////////
// HTML
//  ////////////////////////////////////////
gulp.task('html', function(){
   gulp.src('app/**/*.html')
   .pipe(reload({stream: true})); 
});
    
//  /////////////////////////////////////////
// Scripts
//  ////////////////////////////////////////
gulp.task('scripts', function(){
   gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
   .pipe(concat('main.js'))
   .pipe(rename({suffix: '.min'}))
   .pipe(uglify())
   .pipe(gulp.dest('app/js'))
   .pipe(reload({stream: true}));
});

//  /////////////////////////////////////////
// Compass /Sass Tasks
//  ////////////////////////////////////////
//styles
gulp.task('styles', function() {
	return gulp.src(['app/scss/*.scss', 'app/css/*.css', '!app/css/**/*.min.css)'])
        .pipe(concat('app.css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css/'))
        .pipe(reload({stream: true}));
});

//  /////////////////////////////////////////
// Build Tasks
//  ////////////////////////////////////////

// clear out all files and folders from build directory
gulp.task('build:clean',  function(){
    return del(['build/**']);
});


//Creation of build directory from the contents within the app folder
gulp.task('build:copy', ['build:clean'], function(){
   return gulp.src('app/**/*/')
   .pipe(gulp.dest('build/'));
});

// task to remove unwanted build files (particularly developer bases css and js files)
gulp.task('build:remove', ['build:copy'], function(){
    return del([
        'build/scss/',
        'build/css/!(*.min.css)',
        'build/js/!(*.min.js)'
    ]);
});

gulp.task('build', ['build:remove']); //The Actula Build Command - Starting its sequence from build:remove



//  /////////////////////////////////////////
// Browser-Sync Tasks
//  ////////////////////////////////////////
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});


//  /////////////////////////////////////////
// Running of Final Build Code through the browser
//  ////////////////////////////////////////
gulp.task('build:run', function(){
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
});



//  /////////////////////////////////////////
// Watch Tasks
//  ////////////////////////////////////////
gulp.task('watch', function(){
   gulp.watch('app//**/*.html', ['html']); 
   gulp.watch('app/js/**/*.js', ['scripts']);
   gulp.watch('app/css/**/*.css', ['styles']); 
});



//  /////////////////////////////////////////
// Default Task
//  ////////////////////////////////////////
gulp.task("default", ['html','scripts', 'styles','browser-sync', 'watch']);