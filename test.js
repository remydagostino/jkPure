var assert = require('chai').assert,
    jh = require('./jh');

describe('basics', function() {
  it('should return a function', function(){
    var noop = jh.def(function() {});
    assert.typeOf(noop, 'function');
  });

  it('shouldn\'t give different results than the main function', function() {
    var add = function(a, b) { return a + b; };
    var jhAdd = jh.def(add);
    assert.equal(add(3,4), jhAdd(3,4));
  });
});

describe('trampolining', function() {
  var countDown = jh.def(function() {
    if (n === 0) {
      return jh.result(0);
    }
    else {
      return jh.bounce(function() {
        return n + countDown(n - 1);
      });
    }
  });
});

describe('cool guy syntax', function() {
  var countDown = jh.def(
    jh.caseOf('0').done(0),
    jh.caseOf('x').cont(function(self, x) {
      return jh.Result(x + self(x - 1));
    })
  );
});

describe('more pattern matching', function() {
  var filter = jh.def(
    jh.signature(Function, Array).returns(Array),
    jh.caseOf('_ []').done([]),
    jh.caseOf('fn (x:xs)')
    .cont(
      function(match, fn, x, xs) { return match; },
      function(self, match, fn, x, xs) {
        return [x].concat(self(fn, xs));
      }
    )
    .cont(
      function(match, fn, x, xs) { return !match; },
      function(self, match, fn, x, xs) {
        return self(fn, xs);
      }
    )
    .where(function(fn, x, xs) {
      return [fn(x), fn, x, xs];
    })
  );

  var quickSort = jh.def(
    jh.signature(Array).returns(Array),
    jh.caseOf('[]').done([]),
    jh.caseOf('(x:xs').cont(function(self, bigger, smaller, x) {
      return self(smaller).concat([x]).concat(self(bigger));
    })
    .where(function(self, x, xs) {
      return [
        filter(function(y) { return y > x }, xs),
        filter(function(y) { return y <= x }, xs),
        x
      ];
    })
  );
});

describe('typeclasses', function() {
  var PersonName = jh.Data({ first: String }, { last: String });

  var PhoneNumber = jh.Data(
    jh.classOf('mobile', [{ number: String }]),
    jh.classOf('landline', [{ number: String}, { areaCode: String }])
  );

  var Person = jh.Data({ names: [PersonName] }, { phones: [PhoneNumber] });

  // The prize for most awkward string concat
  var getNameString = jh.def(
    jh.signature(PersonName).returns(String),
    jh.caseOf('("" last)').done(function(last) {
      return last;
    }),
    jh.caseOf('(first "")').done(function(first) {
      return first;
    }),
    jh.caseOf('(first last)').done(function(first, last) {
      return first + ' ' + last;
    })
  );

  var getFullName = jh.def(
    jh.signature([PersonName]).returns(String),
    jh.caseOf('[]').done(''),
    jh.caseOf('(name:rest)')
    .cont(
      function(name, rest, isLast) { return !isLast; },
      function(self, name, rest) {
        return getNameString(name) + ', ' + self(rest)
      }
    )
    .done(
      function(name, rest, isLast) { return isLast; },
      function(name, rest) {
        return getNameString(name);
      }
    )
    .where(function(name, rest) {
      return [name, rest, rest.length > 0];
    })
  );

  // Using it
  /*
  var myPerson = Person(
      [PersonName('John', 'Smith'), PersonName('Jenny', 'Smith')],
      [
        PhoneNumber.mobile('0401 444 444'),
        PhoneNumber.landline({
          number: '1234 1234',
          areaCode: '07'
        })
      ]
  );

  var fullName = getFullName(myPerson.names);

  */
});
