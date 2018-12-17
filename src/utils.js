const DELIMITER = '/'

export const isDev = process.env.NODE_ENV !== 'production'

export const namespacedActionType = (namespace, type) =>
  `${namespace}${DELIMITER}${type}`

export const isObject = o => o instanceof Object && !Array.isArray(o)

export const isFunction = o => typeof o === 'function'

export const createCapturedError = (message, cst) => {
  const error = new Error(message)
  if (cst && Error.captureStackTrace) Error.captureStackTrace(error, cst)
  return error
}

const TYPES_PROXY_HANDLER = {
  get(target, code) {
    if (code in target) {
      return target[code]
    }

    throw createCapturedError(`Key '${code}' does not exist.`, this.get)
  },
}

export const createTypesObject = () =>
  isDev && 'Proxy' in global && typeof Proxy === 'function'
    ? new Proxy({}, TYPES_PROXY_HANDLER)
    : {}

export const checkStateShape = (next, prev, action) => {
  const missingKeys = []
  Object.keys(next).forEach(key => {
    if (key in prev) return
    missingKeys.push(key)
  })

  if (missingKeys.length > 0) {
    console.warn(
      `Reducer for action '${
        action.type
      }' produced new keys: [${missingKeys.join(',')}]`
    )
  }
}
