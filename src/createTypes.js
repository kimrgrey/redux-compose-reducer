import {
  namespacedActionType,
  createTypesObject,
  createCapturedError,
} from './utils'

const createTypes = (namespace, types = []) => {
  if (Array.isArray(namespace)) {
    types = namespace
    namespace = ''
  }

  if (
    typeof namespace !== 'string' ||
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
  'Expected first argument to be a string (for namespaced actions) or non empty array (types)' +
  'or/and second argument (types) to be a non empty array.'

export default createTypes
