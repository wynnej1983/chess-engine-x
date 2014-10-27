'use strict';

var PieceColor = require('./piece.js').PieceColor,
             _ = require('lodash');

/**
 * Constructor for {Move} class
 * @constructor
 * @param {String} args
 * @param {Board} board
 * @param {Player} player
 */
var Move = module.exports = function(args, board) {
  if (!board) {
    throw new Error('board argument is required');
  }
  this.san = args;
  this.piece = null;
  this.src = null;
  this.dst = null;
  this.isWhite = true;
  this._board = board;
  this._parse(args);
};

/**
 * Parses move args string
 * @param {String} args
 */
Move.prototype._parse = function(args) {
  if (!args) throw new Error('move arguments required');
  if (!_.isString(args)) throw new Error('move arguments must be a string');
  var placement = false;
  if (args.length === 3) {
    // placement move with no src
    placement = true;
  }
  if (!placement) {
    if (args.length === 4 || (args.length === 5 && args.indexOf('x') !== -1)) {
      //prepend missing pawn notation to move args
      var src = args.substring(0,2);
      var p = this._board.pieceAt(src);
      if (p === '') {
        throw new Error('no piece found at src');
      }
      args = p + args;
    }
    this.src = args.substring(1,3);
  }
  this.piece = args[0];
  this.isWhite = this.piece.toUpperCase() === this.piece;
  if (!(this.piece in this._board._unicode)) {
console.log(this.piece);
    throw new Error('invalid piece notation');
  }
  var isCapture = _.contains(args, 'x');
  var idx = isCapture ? 4 : 3;
  if (placement) {
    idx = 1;
  }
  this.dst = args.substring(idx, idx + 2);
  if (isCapture) {
    this.capture = this._board.pieceAt(this.dst);
  }
}
