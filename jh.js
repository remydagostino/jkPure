(function(factory) {
  if (module && module.exports) {
    module.exports = factory();
  }
  else {
    this.jh = factory();
  }
}).call(this, function() {
  var def, result, bounce, done, cont, signature, caseOf, Data, classOf;

  // "def" lets you define a new function that is automatically
  // trampolined
  // If it is given multiple functions, it composes them and applies
  // special rules around caseOf and signature
  def = function(fn) {
    return fn;
  };

  // "result" represents the base-case of a recursive funciton
  // the trampoline will now start collecting results
  result = function(val) {

  };

  // "bounce" represents the recursive branch of a function
  // a trampoline will continue to call "bounce"s until it
  // gets a result
  bounce = function(thunk) {

  };

  // "caseOf" is a helper for building declarative recursive
  // functions without having to remember to wrap your return value
  // in a bounce or a result
  caseOf = function(pattern) {
    if (!(this instanceof caseOf)) {
      return new caseOf(pattern);
    }

  };

  caseOf.prototype = {
    // "done" signifies the base-case of a recursive function
    done: function(condition, val) {
      return this;
    },

    // "cont" signifies the recursive branch of a recursive function
    cont: function(condition, thunk) {
      return this;
    },

    // "where" is a helper which lets you perform a calculation
    // and change the arguments passed in to the functions of this
    // branch
    where: function(fn) {
      return this;
    },

    // "def" will look for a pipe function on any argument given
    // to it. If the method exists then it will use it rather than
    // it's own composition function to pipe the functions together
    pipe: function(prev) {
      return function() {};
    }
  };

  // "signature" - throws exceptions if a function is not called
  // with the right parameters
  signature = function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    if (!(this instanceof signature)) {
      return new signature(a1, a2, a3, a4, a5, a6, a7, a8, a9);
    }
  };

  signature.prototype = {
    // "returns" - ensures that any composed function returns the
    // right argument type (not sure if this is a good idea)
    returns: function(returnType) {
      return this;
    },
    // "def" will look for a pipe function.
    pipe: function(prev) {
      return function() {};
    }
  };

  // "Data"
  Data = function(builder) {
    var Thing = function() {
      if (!(this instanceof Thing)) {
        return new Thing(/* args */);
      }
    };

    return Thing;
  };

  // "classOf"
  classOf = function() {

  };

  return {
    def: def,
    result: result,
    bounce: bounce,
    caseOf: caseOf,
    signature: signature,
    Data: Data,
    classOf: classOf
  };
});
