const expect = require('chai').expect;
const composeReducer = require('../src/composeReducer');

describe('#composeReducer', () => {
  const state = {
    test: 'test'
  };

  context('when only namespace and reducer\'s mapping are provided', () => {
    const foo = (state, action) => {
      return Object.assign({}, state, { foo: 'foo'});
    };

    const bar = (state, action) => {
      return Object.assign({}, state, { bar: 'bar'});
    };

    const composedReducer = composeReducer('test', { foo, bar }, state);

    it('ignores unknown actions', () => {
      expect(composedReducer(state, { type: 'test/unknown' })).to.eql(state);
    });

    it('applies proper reducer depends on action type', () => {
      expect(composedReducer(state, { type: 'test/foo' })).to.eql({
        test: 'test',
        foo: 'foo'
      });

      expect(composedReducer(state, { type: 'test/bar' })).to.eql({
        test: 'test',
        bar: 'bar'
      });
    });
  });

  context('when fallback reducer is provided', () => {
    const foo = (state, action) => {
      return Object.assign({}, state, { foo: 'foo' });
    };

    const fallback = (state, action) => {
      return Object.assign({}, state, { fallback: 'fallback' });
    }

    const composedReducer = composeReducer('test', { foo }, state, fallback);

    it('uses proper reducer depends on action type', () => {
      expect(composedReducer(state, { type: 'test/foo' })).to.eql({
        test: 'test',
        foo: 'foo'
      });
    });

    it('uses fallback for unknown actions', () => {
      expect(composedReducer(state, { type: 'test/unknown' })).to.eql({
        test: 'test',
        fallback: 'fallback'
      });
    });
  });
});
