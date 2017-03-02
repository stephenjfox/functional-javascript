/*
Attempting to replicate the curry function, as idealized by lambda calculus,
in JavaScript
*/

// this implementation was taken from a Dave Crockford talk. It doesn't work on Node 7.4
function curry(func, ...first) {
  return function(...second) {
    return func(...first, ...second);
  }
}

const add1 = curry((x, y) => x + y, 1);

console.log(add1(5));

const map = curry((f, arr) => {
  return arr.map(f);
});

const filter = curry(function(f, arr) {
  return arr.filter(f);
});

const box = map((x) => [x]);

const boxTens = box(Array(4).fill(10));
console.log(boxTens);

const flatMap = curry(function(f, nested) {
  return nested.reduce((prev, curr) => prev.concat(curr.map(f)), []);
});
