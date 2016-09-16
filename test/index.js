const expect = require('chai').expect;
const index = require('../index');

describe('#index', () => {
  it('exports object with createTypes and composeReducer', () => {
    expect(index).to.include.keys('createTypes', 'composeReducer');
  });
});
