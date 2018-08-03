import createTypes, { ARGUMENT_ERROR } from '../src/createTypes'

describe('createTypes', () => {
  it('produces correct action types', () => {
    const actual = createTypes('test', ['action1', 'action2'])
    expect(Object.keys(actual)).toEqual(['action1', 'action2'])
    expect(Object.values(actual)).toEqual(['test/action1', 'test/action2'])
  })

  describe('proxy', () => {
    describe('enviroments without Proxy', () => {
      const proxy = global.Proxy

      beforeAll(() => {
        global.Proxy = undefined
      })

      afterAll(() => {
        global.Proxy = proxy
      })

      it('does not produce error', () => {
        const actual = createTypes('test', ['action1', 'action2'])
        expect(() => actual.missingType).not.toThrowError()
      })
    })

    describe('access to action that does not exists', () => {
      let captureStackTrace

      beforeAll(() => {
        captureStackTrace = Error.captureStackTrace
      })

      afterAll(() => {
        Error.captureStackTrace = captureStackTrace
      })

      it('produces error', () => {
        Error.captureStackTrace = jest.fn()

        const actual = createTypes('test', ['action1', 'action2'])
        expect(() => actual.missingType).toThrowErrorMatchingSnapshot()

        expect(Error.captureStackTrace.mock.calls.length).toBe(1)
      })

      it('works in enviroments without captureStackTrace', () => {
        Error.captureStackTrace = undefined
        const actual = createTypes('test', ['action1', 'action2'])
        expect(() => actual.missingType).toThrowErrorMatchingSnapshot()
      })
    })
  })

  describe('validation', () => {
    describe('without parameters', () => {
      it('produces error', () => {
        expect(() => createTypes()).toThrowError(ARGUMENT_ERROR)
      })
    })

    describe('with incorrect namespace', () => {
      it('produces error', () => {
        expect(() => createTypes({})).toThrowError(ARGUMENT_ERROR)
      })
    })

    describe('without types', () => {
      it('produces error', () => {
        expect(() => createTypes('test')).toThrowError(ARGUMENT_ERROR)
      })
    })

    describe('with incorrect types', () => {
      it('produces error', () => {
        expect(() => createTypes('test', {})).toThrowError(ARGUMENT_ERROR)
      })
    })
  })
})
