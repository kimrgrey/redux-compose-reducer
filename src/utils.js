const DELIMITER = '/'

export const namespacedActionType = (namespace, type) =>
  `${namespace}${DELIMITER}${type}`

export const isObject = o => o instanceof Object && !Array.isArray(o)

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

    const keys = Object.keys(target).join(', ')
    throw createCapturedError(`Key '${code}' does not exist.`, this.get)
  },
}

export const createTypesObject = () => {
  const useProxy =
    process.env.NODE_ENV !== 'production' &&
    'Proxy' in global &&
    typeof Proxy === 'function'

  return useProxy ? new Proxy({}, TYPES_PROXY_HANDLER) : {}
}
