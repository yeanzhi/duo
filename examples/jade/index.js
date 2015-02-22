/**
 * Module Dependencies
 */

var jade = require('duo-jade');
var Duo = require('../../');
var path = require('path');
var fs = require('fs');
var join = path.join;

/**
 * Paths
 */

out = join(__dirname, 'build.js');

/**
 * Initialize `Duo`
 */

var duo = Duo(__dirname)
  .use(jade())
  .entry('main.js')

/**
 * Run duo
 */

duo.run(function(err, src) {
  if (err) throw err;
  fs.writeFileSync(out, src);
  var len = Buffer.byteLength(src);
  console.log('all done, wrote %dkb', len / 1024 | 0);
});
