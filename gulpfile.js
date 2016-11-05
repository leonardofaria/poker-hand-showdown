var argv = require('yargs').argv,
    gulp = require('gulp'), 
    babelify = require('babelify'),
    browserify = require('browserify')
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    rsync = require('rsyncwrapper'),
    sass = require('gulp-sass') ,
    shell = require('gulp-shell'),
    source = require('vinyl-source-stream');

var config = {
  cssPath: './src/css',
   jsPath: './src/js',
  dest: './dist'
};


gulp.task('deploy:github', shell.task([
  'push-dir --dir=dist --branch=gh-pages'
]));


gulp.task('deploy:rsync', function() {
  if (!argv.hostname && !argv.username && !argv.destination) {
    console.log('You must provide hostname, username and destination params. Ex.:');
    console.log("gulp deploy:rsync --hostname='xx.com' --username='user' --destination='~/www/app'");
    return false;
  }

  var rsyncConfig = {
    dest: argv.username + '@' + argv.hostname + ':' + argv.destination,
    src: config.dest,
    progress: true,
    incremental: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    silent: false,
    verbose: true
  };

  rsync(rsyncConfig, function(error, stdout, stderr, cmd) {
    console.log('CMD: \n' + cmd);
    if (stdout) { console.log('STDOUT: \n' + stdout); }
    if (stderr) { console.log('STDERR: \n' + stderr); }
    if (error) { console.log('ERROR: \n' + error); }
  });
});



gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: config.dest
    },
    notify: false
  });
});


gulp.task('js', function () {
  return browserify({ debug: true })
    .transform(babelify)
    .require(config.jsPath + '/index.js', { entry: true })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(config.dest));
});


gulp.task('lint', function () {
  return gulp.src(config.jsPath + '/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
});


gulp.task('css', function() { 
  return gulp.src(config.cssPath + '/app.scss')
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError))
    .pipe(gulp.dest(config.dest));
});


 gulp.task('watch', function() {
  gulp.watch(config.dest + '/**/*.html', browserSync.reload);
  gulp.watch(config.cssPath + '/**/*.scss', ['css', browserSync.reload]); 
  gulp.watch(config.jsPath + '/**/*.js', ['js', 'lint', browserSync.reload]); 
});


  gulp.task('default', ['serve', 'watch']);
