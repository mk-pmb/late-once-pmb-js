
<!--#echo json="package.json" key="name" underline="=" -->
late-once-pmb
=============
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Handle an event asap after it fired, even if that was in the past. A
stripped-down version of event-historian-pmb&#39;s .asSoonAs().
<!--/#echo -->



Usage
-----

from [test.usage.js](test.usage.js):

<!--#include file="test.usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="61" -->
```javascript
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
```
<!--/include-->





<!--#toc stop="scan" -->



Known issues
------------

* needs more/better tests and docs




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
