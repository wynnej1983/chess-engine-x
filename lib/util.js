'use strict';

/**
 * Convert SAN notation to board position
 * @param {String} str
 * @return {Object}
 */

module.exports.san2Pos = function(str) {
  var file = str[0],
      rank = str[1],
      pos = {
        x: file.charCodeAt(0) - 'a'.charCodeAt(0),
        y: rank - 1
      };
  if (pos.x >= 8 || pos.y >= 8 || pos.x < 0 || pos.y < 0) {
    throw new Error('invalid SAN position');
  }
  return pos;
};

/**
 * Convert board position to SAN notation
 * @return {String}
 */
module.exports.pos2San= function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var pos = args.length === 1 ? args[0] : { x: args[0], y: args[1] };
  var san = String.fromCharCode(pos.x + 'a'.charCodeAt(0)) + (pos.y + 1);
  return san;
};
