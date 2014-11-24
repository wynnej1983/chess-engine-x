'use strict';

module.exports = Move;

var PieceColor = require('./piece.js').PieceColor,
    _          = require('lodash');

/**
 * Constructor for {Move} class
 * @constructor
 * @param {String} str
 * @param {Function} pieceAt
 */
function Move(san, pieceAt) {
  if (!san) {
    throw new Error('san string required');
  }
  if (!_.isFunction(pieceAt)) {
    throw new Error('pieceAt must be type function');
  }
  this.san = san;
  this.piece = null;
  this.src = null;
  this.dst = null;
  this.capturedPiece = '';
  this.isWhite = true;
  this.pieceAt = pieceAt;
  this._parse(san);
};

/**
 * Parses move san string
 * @param {String} str
 */
Move.prototype._parse = function(str) {
  if (!str) throw new Error('move san string required');
  if (!_.isString(str)) throw new Error('move san must be a string');
  if (this._isPawnMove(str)) {
    //pawn color unknown at this point so use empty space placeholder
    str = ' ' + str;
  }
  this.src = str.slice(1,3);
  this.piece = this.pieceAt(this.src);
  if (this.piece.toString() === '') { throw new Error('no piece found at src ' + this.src); }
  //prepend pawn piece notation, p or P, to san move string
  if (str[0] === ' ') {
    str = str.replace(' ', this.piece);
  }
  if (this.piece.toString() !== str[0]) { throw new Error('piece move notation does not match piece located at src ' + this.src); }
  if ('prnbqk'.indexOf(this.piece.toString().toLowerCase()) === -1) { throw new Error('invalid piece specified in san'); }
  this.isWhite = this.piece.toString().toUpperCase() === this.piece.toString();
  var isCapture = str.indexOf('x') !== -1;
  var idx = isCapture ? 4 : 3;
  this.dst = str.slice(idx, idx + 2);
  this.capturedPiece = isCapture ? this.pieceAt(this.dst) : '';
}

/**
 * Checks san string to determine if it is a pawn movement
 * @param {String} str
 * @returns {Boolean}
 */
Move.prototype._isPawnMove = function(str) {
  return str.length === 4 || (str.length === 5 && str.indexOf('x') !== -1);
}

/**
 * Checks if this is a legal motion for the piece
 * @returns {Boolean}
 */
Move.prototype.isLegalPieceMotion = function() {
  return this.piece.getMotions(this.src).indexOf(this.dst) !== -1;
}

/**
 * Serialize move to pretty string
 * @returns {String}
 */
Move.prototype.toString = function() {
  return '[' + this.san + '] ' + (this.isWhite ? 'White ' : 'Black ') + this.piece + (!!this.capturedPiece ? ' takes ' : ' to ') + (!!this.capturedPiece ? this.capturedPiece + ' on ' + this.dst : this.dst);
}
