const test = require('tape');
const {compose, compose2, compose3} = require('./learning-compose');

test('Validate that inputs are functions', (assert) => {
  function stringLength(string) {
      return string.length;
  }
  function squareNum(int) {
      return int * int;
  }

  const squareLength = compose2(stringLength, squareNum);

  assert.true(typeof(squareLength) == 'function',
    'Given two functions, compose should return a function');

  assert.end();
});

test('Check for an equivalent result.', (assert) => {
  const stringLength = (str) => str.length;
  const square = (num) => num ** 2;

  const input = "cats";

  const expected = square(stringLength(input));

  const actual = compose2(square, stringLength)(input);

  assert.equal(actual, expected,
    'Given two functions, "compose2" should produce the same result as calling the functions in sequence');

  assert.end();
});

test('Compose against 3 functions', (assert) => {
  // prep
  const addOne = num => num + 1;
  const square = (num) => num ** 2;
  const toStrIsEvenLength = (num) => num.toString().length % 2 === 0;

  // [1, 4, 9, 16]
  const inputs = Array.from(new Array(4), (value, ind) => (ind + 1) ** 2);

  const testFunc = compose3(toStrIsEvenLength, square, addOne);

  // just square . addOne: [4, 25, 100, 189]
  // [false, true, false, false]
  const actual = inputs.map(testFunc);

  assert.deepEqual(actual, [false, true, false, false],
    "The result should be 'whether or not the square of (element + 1) was an even number of characters long'");

  assert.end();
});


test('Compose against a variable number of arguments', (assert) => {

  const length = str => str.length;
  const sqr = num => num ** 2;
  const add1 = num => num + 1;
  const box = obj => ([obj]);

  const testInput = "squirrel";
  const testFunc = compose(box, add1, sqr, length);

  const expected = box(add1(sqr(length(testInput))));
  const actual = testFunc(testInput);

  assert.deepEqual(actual, expected,
    `The content of ${expected} and ${actual} should be equivalent`);

  assert.end();
});
