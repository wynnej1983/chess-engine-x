var should      = require('should'),
    Pawn        = require('../lib/pawn.js'),
    PieceColor  = require('../lib/piece.js').PieceColor;

describe('Pawn', function() {
  describe('#getMotions', function() {
    it('should get pawn motions given a src position for white', function() {
      var pawn = new Pawn(PieceColor.White);
      var motions = pawn.getMotions('e2');
      motions.should.eql(['e4', 'd3', 'e3', 'f3']);
    });

    it('should get pawn motions given a src position for black', function() {
      var pawn = new Pawn(PieceColor.Black);
      var motions = pawn.getMotions('e7');
      motions.should.eql(['e5', 'd6', 'e6', 'f6']);
    });
  });
});
