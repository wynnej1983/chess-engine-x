'use strict';

exports = module.exports = {
  version: require('../package.json').version,
  Game: require('./game.js'),
  Board: require('./board.js'),
  Player: require('./player.js'),
  Piece: require('./piece.js'),
  Move: require('./move.js')
};
