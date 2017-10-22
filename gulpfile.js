let gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver'),
    cleanCSS = require('gulp-clean-css');

let src = './src',
    app = './dist/app';

gulp.task('js', function () {
   return gulp.src(src + '/js/app.js')
       .pipe(browserify({
           transform: 'reactify',
           debug: 'true'
       }))
       .on('error', function (err) {
           console.error('Error! ', err.message);
       })
       .pipe(gulp.dest(app + '/js'));
});

gulp.task('html', function(){
   gulp.src(app + '/**/*.html');
});

gulp.task('css', function(){
    gulp.src(src + '/css/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(app + '/css'));
});

gulp.task('watch', function(){
    gulp.watch(src + '/js/**/*.js', ['js']);
    gulp.watch(src + '/css/**/*.css', ['css']);
    gulp.watch(app + '/**/*.html', ['html']);
});

gulp.task('webserver', function () {
    gulp.src(app +'/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);