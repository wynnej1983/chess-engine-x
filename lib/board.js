'use strict';

var _            = require('lodash'),
    chalk        = require('chalk'),
    PieceFactory = require('./pieceFactory.js'),
    PieceColor   = require('./piece.js').PieceColor,
    Empty        = require('./empty.js'),
    Move         = require('./move.js');

/**
 * Constructor for {Board} class
 * @constructor
 */
var Board = module.exports = function(opts) {
  this.squares = [];
  this.captures = [];
  this.isWhiteTurn = _.defaults(opts || {}, { isWhiteTurn: true }).isWhiteTurn;
  this.castlingPermissions = Board.CASTLING_PERMISSIONS.ALL;
  this.enPassantTarget = null;
  this.halfMoveClock = 0;
  this.fullMoveNumber = 1;
  this.clear();
};

/**
 * @constant
 * @type {Number}
 * Constant representing board dimensions
 */
Board.SIZE = 8;

/**
 * @constant
 * @type {String}
 * Starting board position FEN
 */
Board.DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

/**
 * @type {Object}
 * Enum representing castling permissions
 */
Board.CASTLING_PERMISSIONS = {
  NONE: 0,
  WHITE_KING_SIDE: 1 << 0,
  WHITE_QUEEN_SIDE: 1 << 1,
  BLACK_KING_SIDE: 1 << 2,
  BLACK_QUEEN_SIDE: 1 << 3,
  ALL: 15
};

/**
 * Clear board squares
 */
Board.prototype.clear = function() {
  var dim = Board.SIZE;
  for (var i = 0; i < dim; ++i) {
    var col = [];
    for (var j = 0; j < dim; ++j){
       col[j] = new Empty();
    };
    this.squares[i] = col;
  };
  return this;
};

/**
 * Setup board pieces
 */
Board.prototype.setup = function(fen) {
  //clear board
  this.clear();
  this._fenParse(fen || Board.DEFAULT_FEN);
  return this;
};

/**
 * Parse FEN string
 * @param {String} fen
 */
Board.prototype._fenParse = function(fen) {
  //placements
  var parts = fen.split(' ');
  var placement = parts[0];
  var ranks = placement.split('/').reverse();
  ranks.forEach(function(rank, rankIdx) {
    var fileIdx = 0;
    rank.split('').forEach(function(piece) {
      if (!isNaN(piece)) {
        var emptySquareCnt = parseInt(piece, 10);
        fileIdx += emptySquareCnt;
      } else {
        var san = piece + this.pos2San(fileIdx, rankIdx);
        this.place(san);
        fileIdx++;
      }
    }.bind(this));
  }.bind(this));
  //side to move
  this.isWhiteTurn = parts[1] === 'w';
  //castling permissions
  var cp = parts[2];
  //reset to no castling permissions
  this.castlingPermissions = Board.CASTLING_PERMISSIONS.NONE;
  if (cp.indexOf('K') !== -1) {
    this.castlingPermissions |= Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE;
  }
  if (cp.indexOf('Q') !== -1) {
    this.castlingPermissions |= Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE;
  }
  if (cp.indexOf('k') !== -1) {
    this.castlingPermissions |= Board.CASTLING_PERMISSIONS.BLACK_KING_SIDE;
  }
  if (cp.indexOf('q') !== -1) {
    this.castlingPermissions |= Board.CASTLING_PERMISSIONS.BLACK_QUEEN_SIDE;
  }
  //en passant target square
  var enPassantTarget = parts[3];
  if (enPassantTarget !== '-') {
    this.enPassantTarget = enPassantTarget;
  }
  //halfmove clock
  this.halfMoveClock = parseInt(parts[4], 10);
  //fullmove number
  this.fullMoveNumber = parseInt(parts[5], 10);
};

/**
 * Convert board state to FEN string
 * @return {String}
 */
Board.prototype.fenStringify = function() {
  var fen = '',
      ranks = [],
      parts = [],
      dim = Board.SIZE;
  for (var row = dim - 1; row >= 0; row--) {
    var emptySquareCnt = 0,
        rank = '';
    for (var col = 0; col < dim; col++) {
      var piece = this.pieceAt(this.pos2San(col, row));
      if (piece instanceof Empty) {
        emptySquareCnt++;
        if (col === dim - 1 || !(this.pieceAt(this.pos2San(col + 1, row)) instanceof Empty)) {
          rank += emptySquareCnt;
          emptySquareCnt = 0;
        }
      } else {
        rank += piece.toString();
      }
    }
    ranks.push(rank);
  }
  //piece placement fen part
  parts.push(ranks.join('/'));
  parts.push(this.isWhiteTurn ? 'w' : 'b');
  var cp = (this.castlingPermissions | Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE ? 'K' : '')
         + (this.castlingPermissions | Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE ? 'Q' : '')
         + (this.castlingPermissions | Board.CASTLING_PERMISSIONS.BLACK_KING_SIDE ? 'k' : '')
         + (this.castlingPermissions | Board.CASTLING_PERMISSIONS.BLACK_QUEEN_SIDE ? 'q' : '');
  parts.push(cp || '-');
  parts.push(this.enPassantTarget || '-');
  parts.push(this.halfMoveClock);
  parts.push(this.fullMoveNumber);

  fen = parts.join(' ');
  return fen;
};

/**
 * Convert SAN notation to board position
 * @param {String} str
 * @return {Object}
 */
Board.prototype.san2Pos = function(str) {
  var file = str[0],
      rank = str[1],
      pos = {
        x: file.charCodeAt(0) - 'a'.charCodeAt(0),
        y: rank - 1
      };
  if (pos.x >= Board.SIZE || pos.y >= Board.SIZE || pos.x < 0 || pos.y < 0) {
    throw new Error('invalid SAN position');
  }
  return pos;
};
Board.san2Pos = Board.prototype.san2Pos;

/**
 * Convert board position to SAN notation
 * @return {String}
 */
Board.prototype.pos2San = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var pos = args.length === 1 ? args[0] : { x: args[0], y: args[1] };
  var san = String.fromCharCode(pos.x + 'a'.charCodeAt(0)) + (pos.y + 1);
  return san;
};
Board.pos2San = Board.prototype.pos2San;

/**
 * Get piece at SAN location
 * @param {String} str
 * @return {Piece}
 */
Board.prototype.pieceAt = function(str) {
  var pos = this.san2Pos(str);
  var piece = this.squares[pos.x][pos.y];
  return piece;
};

/**
 * Place piece on board
 * @param {String} str
 * @example
 * place('Nc1') #place white knight at c1
 * place('c1')  #place 'empty' piece at c1 ie:clear square
 */
Board.prototype.place = function(str) {
  if (str.length !== 3 && str.length !== 2) {
    return false;
  }
  try {
    var piece = str.length === 2 ? '' : str[0];
    var color = piece.toLowerCase() === piece ? PieceColor.Black : PieceColor.White;
    var pieceFactory = new PieceFactory();
    piece = pieceFactory.create(piece, color);
    if (!piece) {
      return false;
    }
    var idx = piece instanceof Empty ? 0 : 1;
    var dst = this.san2Pos(str.slice(idx, idx+2));
    if (dst.x > Board.SIZE - 1 || dst.y > Board.SIZE - 1) {
      return false;
    }
    this.squares[dst.x][dst.y] = piece;
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
  var move = new Move(str, this.pieceAt.bind(this));
  if (move.isWhite !== this.isWhiteTurn) {
    return null;
  }
  if (!move.isLegalPieceMotion()) {
    return null;
  }
  //clear src square
  if (!this.place(move.src)) { return null; }
  //place piece at dst
  if (!this.place(move.piece + move.dst)) { return null; }
  if (move.capturedPiece) {
    this.captures.push(move.capturedPiece);
  }
  this.isWhiteTurn = !this.isWhiteTurn;
  return move;
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
      ? chalk.black.bgWhite(' ' + this._pieces[this.squares[j][i]].unicode + ' ')
      : chalk.black.bgGreen(' ' + this._pieces[this.squares[j][i]].unicode + ' ');
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

  var captures = '  ';
  this.captures.forEach(function(c,i) {
    if (i === dim) {
      captures += '\n  ';
    }
    captures += chalk.black.bgWhite(' ' + this._pieces[c].unicode + ' ');
  }.bind(this));

  rows.push(captures);
  rows.push('\n');
  return rows.join('\n');
};

/**
 * Map piece ascii string to unicode display symbol
 */
Board.prototype._pieces = {
  p: { count: 8, unicode: '♟' },
  r: { count: 2, unicode: '♜' },
  n: { count: 2, unicode: '♞' },
  b: { count: 2, unicode: '♝' },
  q: { count: 1, unicode: '♛' },
  k: { count: 1, unicode: '♚' },
  P: { count: 8, unicode: '♙' },
  R: { count: 2, unicode: '♖' },
  N: { count: 2, unicode: '♘' },
  B: { count: 2, unicode: '♗' },
  Q: { count: 1, unicode: '♕' },
  K: { count: 1, unicode: '♔' },
  '': { count: 32, unicode: ' ' }
};
