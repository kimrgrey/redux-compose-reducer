const expect = require('chai').expect;
const createTypes = require('../src/createTypes');

describe('#createTypes', () => {
  it("creates mapping between action name and type", () => {
    expect(createTypes('test', [ 'foo', 'bar' ])).to.eql({
      foo: 'test/foo',
      bar: 'test/bar'
    });
  });
})
