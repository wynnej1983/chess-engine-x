var should = require('should'),
    engine = require('../lib/engine.js');

describe("Engine", function() {
  describe("attributes", function() {
    it("has version attribute", function() {
        engine.should.have.property('version');
        engine.should.have.property('version', '0.1.0');
    })
  })
})
