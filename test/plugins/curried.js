chai.use(function(_chai, utils) {
  var Assertion = chai.Assertion;

  /**
   * Tests a function to ensure it's curried. Throws an error if the function is not curried.
   *
   * @param {*} ...args Arguments with which to invoke the curried function.
   * @param {string} expectedType The expected return type when the wrapped (curried) function is
   * finally called.
   * @return {undefined}
   */
  // TODO: This is a little messy, we can refactor it to be tighter. But it works for now
  utils.addMethod(Assertion.prototype, 'curried', function(/* ...args, expectedType */) {
    var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
    var expectedType = arguments[arguments.length - 1];

    // Ensure we're passing arguments to the function
    var argsAssertion = new Assertion(args);
    argsAssertion.assert(
      argsAssertion._obj.length,
      'expected more than 0 arguments to pass to the curried function'
    );

    // Ensure the user has passed an expected type
    var expectedTypeAssertion = new Assertion(expectedType);
    expectedTypeAssertion.assert(
      utils.type(expectedTypeAssertion._obj) === 'string',
      'expected a string return type for the curried function'
    );

    var actualType = utils.type(args.reduce(function(fn, arg) {
      this.assert(
        this._obj instanceof Function,
        'expected #{this} to be a function',
        'expected #{this} to not be curried'
      );

      this.assert(
        this._obj._curried === true,
        'expected #{this} to be curried',
        'expected #{this} to not be curried'
      );

      return fn(arg);
    }.bind(this), this._obj));

    this.assert(
      actualType === expectedType,
      'expected #{this} to be of type #{exp} but received #{act}',
      'expected #{this} to not be of type #{exp}',
      expectedType,
      actualType
    );
  });
});
