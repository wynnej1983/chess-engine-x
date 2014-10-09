var should = require('should'),
    Move   = require('../lib/move.js');

describe("Move", function() {
  describe("constructor", function() {
    it("should throw error if no arguments passed", function() {
      var threw = false;
      try {
        new Move();
      } catch (ex) {
        threw = true;
      }
      threw.should.be.true;
    });

    it("should throw error if arguments are not a string", function() {
      var threw = false;
      try {
        new Move({});
      } catch (ex) {
        threw = true;
      }
      threw.should.be.true;
    });

    it("should parse src and dest from args", function() {
      var move = new Move('e2e4');
      move.src.should.equal('e2');
      move.dst.should.equal('e4');
    });
  });
});
