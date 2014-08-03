/**
 * Module Dependencies
 */

var atomic = require('atomic-json');
var extend = require('extend.js');
var thunk = require('thunkify');
var fs = require('co-fs');

/**
 * Export `Mapping`
 */

module.exports = Mapping;

/**
 * Initialize `Mapping`
 *
 * @param {String} path
 */

function Mapping(path) {
  if (!(this instanceof Mapping)) return new Mapping(path);
  this.atomic = atomic(path);
  this.path = path;
}

/**
 * Read
 *
 * @return {Object}
 * @api public
 */

Mapping.prototype.read = function *() {
  try {
    var obj = yield fs.readFile(this.path, 'utf8');
    return JSON.parse(obj);
  } catch(e) {
    return {};
  }
};

/**
 * Update
 *
 * @param {Object} obj
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

Mapping.prototype.update = function(obj) {
  var self = this;
  return function(fn) {
    self.atomic(obj, fn);
  }
};


/**
 * Stringify
 *
 * @param {Object} json
 * @return {String}
 * @api private
 */

function stringify(json) {
  return JSON.stringify(json, true, 2);
}