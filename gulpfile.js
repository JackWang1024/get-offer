'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gls = require('gulp-live-server');

var del = require('del');
var runSequence = require('run-sequence');

var merge = require('merge-stream');
var path = require('path');
var http = require('http');

var historyApiFallback = require('connect-history-api-fallback');
var fs = require('fs');
var glob = require('glob');


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var styleTask = function(stylesPath, srcs) {
  return gulp.src(srcs.map(function(src) {
      return path.join('app', stylesPath, src);
    }))
    .pipe($.changed(stylesPath, {
      extension: '.css'
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/' + stylesPath))
    .pipe($.if('*.css', $.cssmin()))
    .pipe(gulp.dest('dist/' + stylesPath))
    .pipe($.size({
      title: stylesPath
    }));
};

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function() {
  return styleTask('styles', ['**/*.css']);
});

gulp.task('elements', function() {
  return styleTask('elements', ['**/*.css']);
});

// Lint JavaScript
gulp.task('jshint', function() {
  return gulp.src([
      'app/scripts/**/*.js',
      'app/elements/**/*.js',
      'app/elements/**/*.html'
    ])
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
  //TODO: livereload
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function() {
  var app = gulp.src([
    'app/*',
    '!app/test',
    '!app/precache.json'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));

  var bower = gulp.src([
    'app/lib/**/*'
  ]).pipe(gulp.dest('dist/lib'));

  var elements = gulp.src(['app/elements/**/*'])
    .pipe(gulp.dest('dist/elements'));

  // var swBootstrap = gulp.src(['lib/platinum-sw/bootstrap/*.js'])
  //   .pipe(gulp.dest('dist/elements/bootstrap'));

  // var swToolbox = gulp.src(['lib/sw-toolbox/*.js'])
  //   .pipe(gulp.dest('dist/sw-toolbox'));

  var vulcanized = gulp.src(['app/elements/elements.html'])
    .pipe($.rename('elements.vulcanized.html'))
    .pipe(gulp.dest('dist/elements'));

  // return merge(app, bower, elements, vulcanized, swBootstrap, swToolbox)
  return merge(app, bower, elements, vulcanized)
    .pipe($.size({
      title: 'copy'
    }));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function() {
  return gulp.src(['app/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({
      title: 'fonts'
    }));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function() {
  var assets = $.useref.assets({
    searchPath: ['.tmp', 'app', 'dist']
  });

  return gulp.src(['app/**/*.html', '!app/{elements,test}/**/*.html'])
    // Replace path for vulcanized assets
    .pipe($.if('*.html', $.replace('elements/elements.html', 'elements/elements.vulcanized.html')))
    .pipe(assets)
    // Concatenate And Minify JavaScript
    .pipe($.if('*.js', $.uglify({
      preserveComments: 'some'
    })))
    // Concatenate And Minify Styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.cssmin()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({
      title: 'html'
    }));
});

// Vulcanize imports
gulp.task('vulcanize', function() {
  var DEST_DIR = 'dist/elements';

  return gulp.src('dist/elements/elements.vulcanized.html')
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(DEST_DIR))
    .pipe($.size({
      title: 'vulcanize'
    }));
});

// // Generate a list of files that should be precached when serving from 'dist'.
// // The list will be consumed by the <platinum-sw-cache> element.
// gulp.task('precache', function (callback) {
//   var dir = 'dist';

//   glob('{elements,scripts,styles}/**/*.*', {cwd: dir}, function(error, files) {
//     if (error) {
//       callback(error);
//     } else {
//       files.push('index.html', './', 'lib/webcomponentsjs/webcomponents-lite.min.js');
//       var filePath = path.join(dir, 'precache.json');
//       fs.writeFile(filePath, JSON.stringify(files), callback);
//     }
//   });
// });

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Watch Files For Changes & Reload
gulp.task('serve', ['styles', 'elements'], function() {
  //serve multi folders
  var server = gls.static(['app', '.tmp']);
  server.start();

  gulp.watch(['app/**/*'], function() {
    server.notify.apply(server, arguments);
  });
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  //serve multi folders
  var server = gls('server.js', {env: {NODE_ENV: 'development'}});
  //var server = gls.static('dist');
  server.start();

  gulp.watch(['dist/**/*'], function() {
    server.notify.apply(server, arguments);
  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function(done) {
  runSequence(
    ['copy', 'styles'],
    'elements', ['jshint', 'fonts', 'html'],
    'vulcanize',
    done);
  // Note: add , 'precache' , after 'vulcanize', if your are going to use Service Worker
});

// Load custom tasks from the `tasks` directory
try {
  require('require-dir')('tasks');
} catch (err) {}