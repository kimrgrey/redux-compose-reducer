import * as utils from '../src/utils'
import { composeReducer, createTypes } from '../src'
import { ARGUMENT_ERROR } from '../src/composeReducer'

describe('composeReducer', () => {
  beforeEach(() => {
    console.warn = jest.fn()
  })

  it('produces correct state depends on action type', () => {
    const reducer = composeReducer({
      namespace: 'test',
      initialState: { action: false, action2: false },
      reducers: {
        action: state => Object.assign({}, state, { action: true }),
        action2: state => Object.assign({}, state, { action2: true }),
      },
    })

    let actual = reducer(undefined, { type: 'test/action' })
    expect(actual).toEqual({
      action: true,
      action2: false,
    })

    actual = reducer(undefined, { type: 'test/action2' })
    expect(actual).toEqual({
      action: false,
      action2: true,
    })
  })

  it('ignores unknown actions', () => {
    const action = jest.fn()
    const reducer = composeReducer({
      namespace: 'test',
      initialState: { ok: false },
      reducers: { action },
    })

    const expected = { ok: false }
    const actual = reducer(undefined, { type: 'external/action' })
    expect(actual).toEqual(expected)
    expect(action.mock.calls.length).toBe(0)
  })

  describe('without namespace', () => {
    it('produces correct state depends on action type', () => {
      const reducer = composeReducer({
        initialState: { action: false, action2: false },
        reducers: {
          action: state => Object.assign({}, state, { action: true }),
          action2: state => Object.assign({}, state, { action2: true }),
        },
      })

      let actual = reducer(undefined, { type: 'action' })
      expect(actual).toEqual({
        action: true,
        action2: false,
      })

      actual = reducer(undefined, { type: 'action2' })
      expect(actual).toEqual({
        action: false,
        action2: true,
      })
    })
  })

  describe('`types` attribute', () => {
    it('produces correct state depends on action type', () => {
      const types = createTypes('test', ['action', 'action2'])
      const reducer = composeReducer({
        types,
        initialState: { action: false, action2: false },
        reducers: {
          action: state => Object.assign({}, state, { action: true }),
          action2: state => Object.assign({}, state, { action2: true }),
        },
      })

      let actual = reducer(undefined, { type: types.action })
      expect(actual).toEqual({
        action: true,
        action2: false,
      })

      actual = reducer(undefined, { type: types.action2 })
      expect(actual).toEqual({
        action: false,
        action2: true,
      })
    })

    it('validates reducers', () => {
      const types = createTypes('test', ['action', 'action2'])
      const creator = () =>
        composeReducer({
          types,
          initialState: { action: false, action2: false },
          reducers: {
            action: state => Object.assign({}, state, { action: true }),
            action3: state => Object.assign({}, state, { action2: true }),
          },
        })

      expect(creator).toThrowErrorMatchingSnapshot()
    })
  })

  describe('`reducers` shortcuts', () => {
    it('produces correct state depends on action type', () => {
      const reducer = composeReducer({
        namespace: 'test',
        initialState: { action: false, action2: false },
        reducers: {
          action: { action: true },
          action2: { action2: true },
        },
      })

      let actual = reducer(undefined, { type: 'test/action' })
      expect(actual).toEqual({
        action: true,
        action2: false,
      })

      actual = reducer(undefined, { type: 'test/action2' })
      expect(actual).toEqual({
        action: false,
        action2: true,
      })
    })
  })

  describe('`globalReducer` attribute', () => {
    it('allows to reduce global actions', () => {
      const GLOBAL_ACTION_TYPE = 'GLOBAL/ACTION'

      const globalReducer = (state, action) => {
        switch (action.type) {
          case GLOBAL_ACTION_TYPE:
            return { ok: true }
          default:
            return state
        }
      }
      const reducer = composeReducer({
        namespace: 'test',
        initialState: { ok: false },
        globalReducer,
      })

      const expected = { ok: true }
      const actual = reducer(undefined, { type: GLOBAL_ACTION_TYPE })
      expect(actual).toEqual(expected)
    })

    it('works after `reducers` attribute', () => {
      const globalReducer = (state, action) => {
        switch (action.type) {
          case 'test/action':
            expect(state).toEqual({ ok: true })
            return state

          default:
            return state
        }
      }
      const reducer = composeReducer({
        namespace: 'test',
        initialState: { ok: false },
        reducers: {
          action: () => ({ ok: true }),
        },
        globalReducer,
      })

      const expected = { ok: true }
      const actual = reducer(undefined, { type: 'test/action' })
      expect(actual).toEqual(expected)
    })
  })

  describe('depricated api', () => {
    it('still supported', () => {
      const reducer = composeReducer(
        'test',
        {
          action: () => ({ ok: true }),
        },
        { ok: false }
      )

      const expected = { ok: true }
      const actual = reducer(undefined, { type: 'test/action' })
      expect(actual).toEqual(expected)
    })

    it('produces console.warn', () => {
      console.warn = jest.fn()
      const reducer = composeReducer(
        'test',
        {
          action: () => ({ ok: true }),
        },
        { ok: false }
      )

      reducer(undefined, { type: 'test/action' })
      const { calls } = console.warn.mock
      expect(calls.length).toBe(1)
      expect(calls[0][0]).toMatchInlineSnapshot(
        `"redux-compose-reducer#composeReducer: Multiple arguments api is depricated and will be removed in future versions. Please use object argument."`
      )
    })
  })

  describe('validation', () => {
    describe('without parameters', () => {
      it('produces error', () => {
        expect(() => composeReducer()).toThrowError(ARGUMENT_ERROR)
      })
    })

    describe('with incorrect namespace attribute', () => {
      it('produces error', () => {
        expect(() => composeReducer({ namespace: {} })).toThrowError(
          ARGUMENT_ERROR
        )
      })
    })

    describe('with incorrect types attribute', () => {
      it('produces error', () => {
        expect(() => composeReducer({ types: null })).toThrowError(
          ARGUMENT_ERROR
        )
      })
    })

    describe('with incorrect initialState attribute', () => {
      it('produces error', () => {
        expect(() =>
          composeReducer({ namespace: 'test', initialState: false })
        ).toThrowError(ARGUMENT_ERROR)
      })
    })

    describe('with incorrect reducers attribute', () => {
      it('produces error', () => {
        expect(() =>
          composeReducer({
            namespace: 'test',
            initialState: {},
            reducers: null,
          })
        ).toThrowError(ARGUMENT_ERROR)
      })
    })

    describe('with incorrect globalReducer attribute', () => {
      it('produces error', () => {
        expect(() =>
          composeReducer({
            namespace: 'test',
            initialState: {},
            globalReducer: {},
          })
        ).toThrowError(ARGUMENT_ERROR)
      })
    })
  })

  describe('unknown keys', () => {
    const reducer = composeReducer({
      namespace: 'test',
      initialState: {
        knownAttribute: true,
      },
      reducers: {
        action: state => Object.assign({}, state, { unknownAttribute: true }),
      },
    })

    afterEach(() => {
      utils.isDev = true
    })

    describe('development build', () => {
      it('produces warning', () => {
        reducer(undefined, { type: 'test/action' })

        const { calls } = console.warn.mock
        expect(calls.length).toBe(1)
        expect(calls[0][0]).toMatchInlineSnapshot(
          `"Reducer for action 'test/action' produced new keys: [unknownAttribute]"`
        )
      })
    })

    describe('production build', () => {
      it('works silently', () => {
        utils.isDev = false
        reducer(undefined, { type: 'test/action' })
        expect(console.warn.mock.calls.length).toBe(0)
      })
    })
  })
})
