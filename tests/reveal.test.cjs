const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const code = fs.readFileSync('assets/js/script.js', 'utf8').split('// Video visibility')[0];
function setup({ reduced = false, supported = true } = {}) {
  let callback, change, options, constructions = 0;
  const observed = new Set();
  const targets = Array.from({ length: 3 }, () => {
    const classes = new Set();
    return { classes, additions: 0, classList: {
      add(c) { classes.add(c); }, remove(c) { classes.delete(c); }
    } };
  });
  const preference = { matches: reduced, addEventListener(k, f) { change = f; } };
  const window = supported ? { IntersectionObserver: true, matchMedia: () => preference } : {};
  vm.runInNewContext(code, { window, document: { querySelectorAll: () => targets },
    IntersectionObserver: class {
      constructor(cb, opts) { constructions++; callback = cb; options = opts; }
      observe(t) { observed.add(t); }
      unobserve(t) { observed.delete(t); }
      disconnect() { observed.clear(); }
    }
  });
  return { targets, observed, preference, options, constructions,
    enter: (target, ratio = .2) => callback([{ target, isIntersecting: ratio > 0, intersectionRatio: ratio }]),
    motion: value => { preference.matches = value; change(); } };
}
test('one observer; meaningful threshold and targets unobserved after first entrance', () => {
  const s = setup(); assert.equal(s.constructions, 1); assert.equal(s.options.threshold, .1);
  const target = s.targets[0]; s.enter(target, .05); assert(!target.classes.size);
  s.enter(target); assert(target.classes.has('is-revealed')); assert(!s.observed.has(target));
  target.classes.clear(); s.enter(target); assert(!target.classes.size); // a stale entry cannot replay
});
test('scrolling out never removes the visible completion state', () => {
  const s = setup(); s.enter(s.targets[0]); s.enter(s.targets[0], 0);
  assert(s.targets[0].classes.has('is-revealed'));
});
test('reduced motion at startup exposes content without starting entrances', () => {
  const s = setup({ reduced: true }); assert.equal(s.observed.size, 0);
  assert(s.targets.every(t => !t.classes.size)); s.motion(false); assert.equal(s.observed.size, 0);
});
test('changing to reduced motion cancels entrances; changing back never replays', () => {
  const s = setup(); s.enter(s.targets[0]); s.motion(true);
  assert.equal(s.observed.size, 0); assert(s.targets.every(t => !t.classes.size));
  s.motion(false); assert.equal(s.observed.size, 0); assert.equal(s.constructions, 1);
});
test('unsupported APIs leave content untouched', () => {
  const s = setup({ supported: false }); assert.equal(s.constructions, 0);
  assert(s.targets.every(t => !t.classes.size));
});
