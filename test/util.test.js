var should   = require('should'),
    Iterator = require('../lib/util.js').Iterator;

describe('util', function() {
  describe('Iterator', function() {
    describe('constructor', function() {
      it('should throw when no seq param provided', function() {
        (function(){new Iterator()}).should.throw();
      })

      it('should instantiate with sequence', function() {
        var iter = new Iterator([]);
        iter.should.be.ok;
      })

      it('should instantiate with hasNext and next funcs', function() {
        var hasNext = function() {};
        var next = function() {};
        var iter = new Iterator(hasNext, next);
        iter.should.be.ok;
      })

      it('should set attributes', function() {
        var iter = new Iterator([]);
        iter.should.have.property('value');
        iter.should.have.property('hasNext');
        iter.should.have.property('next');
      })
    })

    describe('#hasNext', function() {
      it('should return a boolean', function() {
        var iter = new Iterator([]);
        iter.hasNext().should.be.a.Boolean;
      })

      it('should return false when given empty sequence', function() {
        var iter = new Iterator([]);
        iter.hasNext().should.be.false;
      })

      it('should return true when sequence contains at one or more items', function() {
        var iter = new Iterator([1]);
        iter.hasNext().should.be.true;
      })

      it('should return false when at end of sequence', function() {
        var iter = new Iterator([1]);
        iter._idx = 0;
        iter.hasNext().should.be.false;
      })
    })

    describe('#next', function() {
      it('should return null when given empty sequence', function() {
        var iter = new Iterator([]);
        (iter.next() === null).should.be.true;
      })

      it('should return next item when sequence contains at one or more items', function() {
        var iter = new Iterator([1]);
        iter.next().should.be.eql(1);
      })

      it('should return last item when try to move past end of sequence', function() {
        var iter = new Iterator([1]);
        iter.next();
        iter.next().should.eql(iter.value);
      })

      it('should iterate through items in sequence', function() {
        var hasNext = function() { return true; };
        var next = function(i) { return i === null ? 0 : i + 1 };
        var iter = new Iterator(hasNext, next);
        iter.next();
        iter.next();
        iter.next();
        iter.next();
        iter.next();
        iter.next();
        iter.value.should.eql(5);
      })
    })

    describe('value', function() {
      it('should return null initially', function() {
        var iter = new Iterator([]);
        (iter.value === null).should.be.true;
      })

      it('should not be able to set value getter', function() {
        var iter = new Iterator([1]);
        iter.next();
        iter.value.should.eql(1);
        iter.value = 2;
        iter.value.should.eql(1);
      })

      it('should return current item in sequence', function() {
        var iter = new Iterator([1,2,3]);
        iter.next();
        iter.next();
        iter.value.should.eql(2);
      })
    })
  })
})
