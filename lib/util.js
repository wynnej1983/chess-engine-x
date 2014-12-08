'use strict';

var util = exports = module.exports;

util.Iterator = function() {
  var args = Array.prototype.slice.call(arguments);
  if (args.length !== 1 && args.length !== 2) throw new Error('args must be an Array or iterator functions');
  if (args.length === 1) {
    
    var seq = args[0];
    if (!Array.isArray(seq)) throw new Error('args must be an Array');
    this._seq = seq;
    this._idx = 0;
  } else {
    this._hasNext = args[0];
    this._next = args[1];
  }
}

util.Iterator.prototype.hasNext = function() {
  if (this._hasNext) return this._hasNext(this.value);
  if (this._seq.length === 0 || this._seq.length === this._idx)
    return false;
  
  return true;
}
util.Iterator.prototype.next = function() {
  if (this._next) {
    if (this._hasNext()) {
      this.value = this._next(this.value);
    }
  }
  else if (this.hasNext()) {
    this.value = this._seq[this._idx++];
  }
  
  return this.value;
}
util.Iterator.prototype.value = null;
