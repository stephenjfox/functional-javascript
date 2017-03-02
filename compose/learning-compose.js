/*
An attempt at recreating the ideal compose function:
Take in a variable number of arguments, each of which is a function.
Return a function that will apply the series of transformations of the first, throughout the remainder.

... That was a really poor explaination.
If we define a function as "foo :: a -> b" to mean "a function named foo that maps a given 'a' to some 'b'"
  and a function "bar :: b -> c" to be "a function named bar that maps a given 'b' to some 'c'",
  then composition of "foo" and "bar" would be "foobar :: a -> c".
  This is the intent of "compose", applied to an indefinite length.
*/

module.exports.compose2 = function(first, second) {
    return function(...args) {
      return first(second.apply(null, args));
    }
}

module.exports.compose3 = function(first, second, third) {
  return function(...args) {
    return first(second(third.apply(null, args)));
  }
}

module.exports.compose = function() {
  
  if (arguments.length === 0) {
    throw Error("Cannot compose without function arguments");
  }
  else if (arguments.length === 1 && typeof(arguments[0]) === "function") {
    // idealy, we would curry for at least another function
    // but here, we'll just return what we got.
    return arguments[0];
  } else {

    const functions = Array.from(arguments);
    const firstToApply = functions[functions.length - 1];
    const functionsToApply = functions.slice(0, functions.length - 1);

    return function (...firstParameters) {

      return functionsToApply.reduceRight((prevResult, func) => {
        console.error(`prev: ${prevResult}, func: ${func}`);
        return func(prevResult);
      }, firstToApply.apply(null, firstParameters));
    }
  }
}