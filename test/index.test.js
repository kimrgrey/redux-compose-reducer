import * as index from '../src'

describe('index', () => {
  it('contains correct exports', () => {
    const actual = Object.keys(index)
    expect(actual).toContain('createTypes')
    expect(actual).toContain('composeReducer')
  })
})
