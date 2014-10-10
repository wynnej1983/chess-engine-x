var should = require('should'),
    Move   = require('../lib/move.js');

describe("Move", function() {
  describe("constructor", function() {
    it("should throw error if no arguments passed", function() {
      (function(){new Move()}).should.throw();
    });

    it("should throw error if arguments are not a string", function() {
      (function(){new Move({})}).should.throw();
    });

    it("should parse src and dest from args", function() {
      var move = new Move('e2e4');
      move.src.should.equal('e2');
      move.dst.should.equal('e4');
    });
  });
});
