
/**
 * Module dependencies.
 */

var path = require('path');
var join = path.join;
var fs = require('fs');
var ls = fs.readdirSync;
var exists = fs.existsSync;
var fmt = require('util').format;
var spawn = require('child_process').spawn;
var assert = require('assert');
var gnode = require.resolve('gnode/bin/gnode');
var dir = join(__dirname, '..', 'examples');

/**
 * Built files.
 */

var map = {
  css: 'build/build.css',
  default: 'build.js',
};

/**
 * Generate tests for each of the examples.
 */

describe('Duo Examples', function () {
  this.slow('2s')
  this.timeout('10s');

  ls(dir).forEach(function (example) {
    var root = join(dir, example);
    var index = join(root, 'index.js');
    if (!exists(index)) return;

    it(fmt('should build examples/%s/index.js', example), function (done) {
      var args = [gnode, index];
      var proc = spawn('node', args);
      var build = join(root, map[example] || map.default);
      proc.on('close', function (code) {
        assert(0 == code);
        assert(exists(build));
        done();
      });
    });
  });
});
