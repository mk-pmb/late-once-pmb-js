/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('usnam-pmb');

var equal = require('equal-pmb'), test = {},
  makeLogger = require('subjlog1707-pmb');

test.toString = function () { return 'usage test'; };
test.ok = function () { console.log("+OK usage test passed."); };
test.log = makeLogger(test, { verbose: true });

(function readmeDemo() {
  //#u
  var lateOnce = require('late-once-pmb'), onNext,
    clock = require('event-test-clock-pmb').flavors.quarterSeconds();

  onNext = {
    begin:  lateOnce(clock, 'beginTest'),
    left:   lateOnce(clock, 'mono'),
    right:  lateOnce(clock, 'mono'),
  };
  onNext.begin(test.log.l8r(['Test begins.']));
  onNext.left(test.log.l8r(['L:']));
  onNext.right(test.log.l8r(['R:']));

  function addSubwoofer() {
    onNext.subwoofer = lateOnce(clock, 'mono');
  }

  function lateSubscribe() {
    onNext.left(test.log.l8r(['Late:']));
    onNext.right(test.log.l8r(['lateR:']));
    onNext.subwoofer(test.log.l8r(['sub:']));
  }

  clock.emit('beginTest', 'Godspeed!');
  clock.on('fullSec', function (t) { test.log({ time_sec: t }); });
  clock.schedule([ 'abs',
    1, function () { clock.emit('mono', 'do'); },
    2, function () { clock.emit('mono', 're'); },
    3, function () { clock.emit('mono', 'mi'); },
    4, addSubwoofer,
    5, lateSubscribe,
    6, function () { clock.emit('mono', 'fa'); },
    7, function () { clock.emit('mono', 'so'); },
    9, function () { clock.emit('mono', 'la'); },
    10, lateSubscribe,
    11, function () { clock.emit('mono', 'ti'); },
    13, function () { clock.emit('beginTest', 'again!'); },
    15, function () { test.verify(); },
    ]);

  test.verify = function () {
    clock.stop();
    equal.lists(test.log(), [
      [ 'Test begins.', 'Godspeed!' ],
      [ 'L:', 'do' ],
      [ 'R:', 'do' ],
      { time_sec: 1 },
      [ 'Late:', 'do' ],
      [ 'lateR:', 'do' ],
      [ 'sub:', 'fa' ],
      { time_sec: 2 },
      [ 'Late:', 'do' ],
      [ 'lateR:', 'do' ],
      [ 'sub:', 'fa' ],
      { time_sec: 3 },
    ]);
    test.ok();
  };
  //#r
  clock.verbose = 0;
}());









//= "+OK usage test passed."
