var gulp = require('gulp')
  , spawn = require('child_process').spawn
  , node;

/**
 * Start node server with gulp
 */
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function() {
  gulp.run('server');

  gulp.watch(['./server.js'], function() {
    gulp.run('server')
  });

});

// clean up if an error goes unhandled.
process.on('exit', function() {
  if (node) node.kill()
});