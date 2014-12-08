'use strict';

var util = exports = module.exports;

util.Iterator = function() {
  var args = Array.prototype.slice.call(arguments);
  if (args.length !== 1 && args.length !== 2) throw new Error('args must be an Array or iterator functions');
  if (args.length === 1) {
    var seq = args[0];
    if (!Array.isArray(seq)) throw new Error('args must be an Array');
  } else {
    this._hasNext = args[0];
    this._next = args[1];
  }
  this._seq = seq;
  this._value = null;
  this._idx = -1;

  Object.defineProperty(this, 'value', {
    get: function() { return this._value; }
  });
}

util.Iterator.prototype.hasNext = function() {
  if (this._hasNext) return this._hasNext(this._value);
  if (this._seq.length === 0 || this._idx + 1 > this._seq.length - 1)
    return false;
  
  return true;
}
util.Iterator.prototype.next = function() {
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
