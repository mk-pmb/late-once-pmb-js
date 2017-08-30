/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
module.exports = function (e, n) {
  'use strict';
  var s = function (h) { return (s.a ? h.apply(e, s.a) : e.once(n, h)); };
  e.once(n, function () { s.a = arguments; });
  return s;
};
