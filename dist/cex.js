!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.cex=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var engine = module.exports = {
  version: require('../package.json').version
};

},{"../package.json":2}],2:[function(require,module,exports){
module.exports={
  "name": "chess-engine-x",
  "version": "0.1.0",
  "description": "chess engine for browser and node",
  "main": "./dist/cex.js",
  "scripts": {
    "test": "mocha",
    "build": "browserify ./lib/engine.js -d --s cex > ./dist/cex.js"
  },
  "devDependencies": {
    "browserify": "latest",
    "mocha": "^1.19.0",
    "should": "^4.0.4"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wynnej1983/chess-engine-x"
  },
  "keywords": [
    "chess",
    "game",
    "engine",
    "javascript"
  ],
  "author": "Jonathan Wynne <wynnej1983@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/wynnej1983/chess-engine-x/issues"
  },
  "homepage": "https://github.com/wynnej1983/chess-engine-x"
}

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvd3lubmVqMTk4My9jb2RlL2NoZXNzLWVuZ2luZS14L2xpYi9lbmdpbmUuanMiLCIvVXNlcnMvd3lubmVqMTk4My9jb2RlL2NoZXNzLWVuZ2luZS14L3BhY2thZ2UuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGVuZ2luZSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICB2ZXJzaW9uOiByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uXG59O1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJjaGVzcy1lbmdpbmUteFwiLFxuICBcInZlcnNpb25cIjogXCIwLjEuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiY2hlc3MgZW5naW5lIGZvciBicm93c2VyIGFuZCBub2RlXCIsXG4gIFwibWFpblwiOiBcIi4vZGlzdC9jZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInRlc3RcIjogXCJtb2NoYVwiLFxuICAgIFwiYnVpbGRcIjogXCJicm93c2VyaWZ5IC4vbGliL2VuZ2luZS5qcyAtZCAtLXMgY2V4ID4gLi9kaXN0L2NleC5qc1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImJyb3dzZXJpZnlcIjogXCJsYXRlc3RcIixcbiAgICBcIm1vY2hhXCI6IFwiXjEuMTkuMFwiLFxuICAgIFwic2hvdWxkXCI6IFwiXjQuMC40XCJcbiAgfSxcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS93eW5uZWoxOTgzL2NoZXNzLWVuZ2luZS14XCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJjaGVzc1wiLFxuICAgIFwiZ2FtZVwiLFxuICAgIFwiZW5naW5lXCIsXG4gICAgXCJqYXZhc2NyaXB0XCJcbiAgXSxcbiAgXCJhdXRob3JcIjogXCJKb25hdGhhbiBXeW5uZSA8d3lubmVqMTk4M0BnbWFpbC5jb20+XCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3d5bm5lajE5ODMvY2hlc3MtZW5naW5lLXgvaXNzdWVzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS93eW5uZWoxOTgzL2NoZXNzLWVuZ2luZS14XCJcbn1cbiJdfQ==
