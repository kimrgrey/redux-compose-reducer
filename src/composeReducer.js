import { namespacedActionType, isObject, createCapturedError } from './utils'

const composeReducer = (...args) => {
  const {
    namespace,
    types,
    initialState,
    reducers = {},
    globalReducer,
  } = prepareParams(args)

  if (
    (types !== undefined && !isObject(types)) ||
    (types === undefined &&
      (typeof namespace !== 'string' || namespace.length === 0)) ||
    !isObject(initialState) ||
    !isObject(reducers) ||
    (globalReducer !== undefined && typeof globalReducer !== 'function')
  )
    throw createError(ARGUMENT_ERROR)

  const typeToReducerMap = types
    ? createMapFromTypes(types, reducers)
    : createMapFromNamespace(namespace, reducers)

  return (state = initialState, action) => {
    state = typeToReducerMap[action.type]
      ? typeToReducerMap[action.type](state, action)
      : state
    return globalReducer ? globalReducer(state, action) : state
  }
}

const prepareParams = args => {
  if (typeof args[0] === 'string') {
    console.warn(DEPRICATED_API_WARNING)
    return {
      namespace: args[0],
      reducers: args[1],
      initialState: args[2],
      globalReducer: args[3],
    }
  }

  return args[0] || {}
}

const createMapFromTypes = (types, reducers) => {
  const result = {}
  Object.keys(reducers).forEach(key => {
    if (!(key in types)) throw createError(`There is no '${key}' action type.`)
    result[types[key]] = reducers[key]
  })
  return result
}

const createMapFromNamespace = (namespace, reducers) => {
  const result = {}
  Object.keys(reducers).forEach(type => {
    result[namespacedActionType(namespace, type)] = reducers[type]
  })
  return result
}

export const ARGUMENT_ERROR = `As argument expected object of shape : {
  namespace: 'non empty string',
  types: 'object',
  initialState: 'object',
  reducers: 'object',
  globalReducer: 'function'
}.
Required keys: namespace or types, initialState.`

const DEPRICATED_API_WARNING =
  'redux-compose-reducer#composeReducer: ' +
  'Multiple arguments api is depricated and will be removed in future versions. ' +
  'Please use object argument.'

const createError = message => createCapturedError(message, composeReducer)

export default composeReducer
