var should = require('should'),
    cex = require('../lib/engine.js');

describe("cex", function() {
  describe("attributes", function() {
    it("has version attribute", function() {
      cex.should.have.property('version');
    })

    it("has Game attribute", function() {
      cex.should.have.property('Game', cex.Game);
    })
  })
})
