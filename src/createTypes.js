import {
  namespacedActionType,
  createTypesObject,
  createCapturedError,
} from './utils'

const createTypes = (namespace, types = []) => {
  if (
    typeof namespace !== 'string' ||
    namespace.length === 0 ||
    !Array.isArray(types) ||
    types.length === 0
  )
    throw createError(ARGUMENT_ERROR)

  const result = createTypesObject()
  types.forEach(type => {
    result[type] = namespacedActionType(namespace, type)
  })
  return result
}

const createError = message => createCapturedError(message, createTypes)

export const ARGUMENT_ERROR =
  'Expected first argument (namespace) to be a non empty string ' +
  'and second argument (types) to be a non empty array.'

export default createTypes
