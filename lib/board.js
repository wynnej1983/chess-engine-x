'use strict';

var _     = require('lodash'),
    chalk = require('chalk'),
    Move = require('./move.js');

/**
 * Constructor for {Board} class
 * @constructor
 */
var Board = module.exports = function(opts) {
  this.squares = [];
  this.captures = [];
  this.isWhiteTurn = _.defaults(opts || {}, {isWhiteTurn: true}).isWhiteTurn;
  this.init();
};

/**
 * @constant
 * @type {Number}
 * Constant representing board dimensions
 */
Board.SIZE = 8;

/**
 * Init board 8x8 empty squares
 */
Board.prototype.init = function() {
  var dim = Board.SIZE;
  for (var i = 0; i < dim; ++i) {
    var col = [];
    for (var j = 0; j < dim; ++j){
       col[j] = '';
    };
    this.squares[i] = col;
  };

  return true;
};
/**
 * Convert SAN notation to board position
 * @param {String} str
 * @return {Object}
 */
Board.prototype.san2Pos = function(str) {
  var file = str[0];
  var rank = str[1];
  var pos = {
    x: file.charCodeAt(0) - 'a'.charCodeAt(0),
    y: rank - 1
  };
  if (pos.x >= Board.SIZE || pos.y >= Board.SIZE
   || pos.x < 0 || pos.y < 0) {
    throw new Error('invalid SAN position');
  }

  return pos;
};

/**
 * Convert board position to SAN notation
 * @param {Object} pos
 * @return {String}
 */
Board.prototype.pos2San = function(pos) {
  return String.fromCharCode(pos.x + 'a'.charCodeAt(0)) + (pos.y + 1);
};


/**
 * Get piece at SAN location
 * @param {String} str
 * @return {String}
 */
Board.prototype.pieceAt = function(str) {
  var pos = this.san2Pos(str);
  return this.squares[pos.x][pos.y];
};

/**
 * Place piece on board
 * @param {String} str
 */
Board.prototype.place = function(str) {
  if (str.length !== 3) {
    return false;
  }
  try {
    var move = new Move(str, this);
    var dst = this.san2Pos(move.dst);
    this.squares[dst.x][dst.y] = move.piece;
  } catch (ex) {
    return false;
  }

  return true;
};

/**
 * Move piece from src to dst
 * @param {String} str
 * @return {Move}
 */
Board.prototype.move = function(str) {
  var src = null;
  var dst = null;
  var move = new Move(str, this);
  if (move.isWhite !== this.isWhiteTurn) {
    return null;
  }
  try {
    src = this.san2Pos(move.src);
    this.squares[src.x][src.y] = '';
  } catch (ex) {
  }
  try {
    dst = this.san2Pos(move.dst);
  } catch (ex) {
    return null;
  }
  if (src.x > Board.SIZE - 1 || src.y > Board.SIZE - 1) {
    return null;
  }
  if (dst.x > Board.SIZE - 1 || dst.y > Board.SIZE - 1) {
    return null;
  }
  this.squares[dst.x][dst.y] = move.piece;
  if (move.capture) {
    this.captures.push(move.piece);
  }
  this.isWhiteTurn = !this.isWhiteTurn;

  return move;
};

/**
 * Setup board pieces
 */
Board.prototype.setup = function() {
  ['Pa2','Pb2','Pc2','Pd2','Pe2','Pf2','Pg2','Ph2',
   'Ra1','Nb1','Bc1','Qd1','Ke1','Bf1','Ng1','Rh1',
   'pa7','pb7','pc7','pd7','pe7','pf7','pg7','ph7',
   'ra8','nb8','bc8','qd8','ke8','bf8','ng8','rh8'].forEach(function(piece){
    this.place(piece);
  }, this);
};

/**
 * Print board and piece as ASCII array
 * @return {String}
 */
Board.prototype.print = function() {
  function isOdd(i) {
    return i % 2 !== 0;
  }
  function alternatingSquare(idx) {
    return isOdd(idx)
      ? chalk.black.bgWhite(' ' + this._unicode[this.squares[j][i]] + ' ')
      : chalk.black.bgGreen(' ' + this._unicode[this.squares[j][i]] + ' ');
  }

  var rows = [],
      dim  = Board.SIZE;
  for (var i = 0; i < dim; i++) {
    var row = i + 1 + ' ';
    for (var j = 0; j < dim; j++) {
      row += alternatingSquare.call(this,j-isOdd(i));
    };
    rows[dim-i-1] = row;
    if (i === 0) {
      rows[dim-i] = '   a  b  c  d  e  f  g  h';
    }
  };

  rows.unshift('\n');
  rows.push('\n');

  return rows.join('\n');
};

/**
 * Map piece ascii string to unicode string to display symbol
 */
Board.prototype._unicode = {
  p: '♟',
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  P: '♙',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
  '': ' '
};
