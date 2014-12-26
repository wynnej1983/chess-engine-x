'use strict';

var util = module.exports = require('util');
util.Iterator = Iterator;
util.AggregateIterator = AggregateIterator;

function Iterator() {
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 1) {
    var seq = args[0];
    if (!Array.isArray(seq)) throw new Error('args must be an Array');
  } else {
    this._hasNext = args[0];
    this._next = args[1];
  }
  this._seq = seq || [];
  this._value = null;
  this._idx = -1;

  Object.defineProperty(this, 'value', {
    get: function() { return this._value; }
  });
}

Iterator.prototype.hasNext = function() {
  if (this._hasNext) return this._hasNext(this._value);
  if (this._seq.length === 0 || this._idx + 1 > this._seq.length - 1)
    return false;
  
  return true;
}

Iterator.prototype.next = function() {
  if (this._next) {
    if (this._hasNext()) {
      this._value = this._next(this._value);
    }
  }
  else if (this.hasNext()) {
    this._idx++;
    this._value = this._seq[this._idx];
  }

  return this._value;
}


function AggregateIterator () {
  var iters = Array.prototype.slice.call(arguments)
    .filter(function(i) { return !(Array.isArray(i) && i.length === 0); })
    .map(function(i) { return Array.isArray(i) ? new Iterator(i) : i; });
  Iterator.call(this, iters);
}

util.inherits(AggregateIterator, Iterator);

AggregateIterator.prototype.hasNext = function() {
  if ( this._seq.length === 0 || this._seq[0]._seq.length === 0
    || this._idx + 1 > this._seq.reduce(function(memo, i) { return memo + i._seq.length; }, 0) - 1) {
    return false;
  }

  return true;
}

AggregateIterator.prototype.next = function() {
  if (this.hasNext()) {
    this._idx++;
    this._value = this._seq.reduce(function(memo, i) {
      memo = memo.concat(i._seq);
      return memo;
    }, [])[this._idx];
  }

  return this._value;
}
