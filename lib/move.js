'use strict';

var _      = require('lodash'),
    Move   = require('../lib/move.js');

/**
 * Constructor for {Move} class
 */
var Move = module.exports = function(args) {
  this.src = null;
  this.dst = null;
  this._parse(args);
};

/**
 * Parses move args string
 */
Move.prototype._parse = function(args) {
  if (!args) throw new Error('move arguments required');
  if (!_.isString(args)) throw new Error('move arguments must be a string');
  this.src = args.substring(0,2);
  this.dst = args.substring(2,4);
}
