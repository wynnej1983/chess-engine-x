var should = require('should'),
    cex = require('../lib/engine.js');

describe('cex', function() {
  describe('attributes', function() {
    it('has version attribute', function() {
      cex.should.have.property('version');
    })

    it('has Game attribute', function() {
      cex.should.have.property('Game', cex.Game);
    })

    it('has Board attribute', function() {
      cex.should.have.property('Board', cex.Board);
    })

    it('has Player attribute', function() {
      cex.should.have.property('Player', cex.Player);
    })

    it('has Piece attribute', function() {
      cex.should.have.property('Piece', cex.Piece);
    })

    it('has Move attribute', function() {
      cex.should.have.property('Move', cex.Move);
    })
  })
})
