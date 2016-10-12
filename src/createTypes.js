function createTypes(namespace, actionTypes) {
  return actionTypes.reduce(function(result, actionType) {
    result[actionType] = `${namespace}/${actionType}`;
    return result;
  }, {})
}

module.exports = createTypes;
