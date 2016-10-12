function createTypes(namespace, actionTypes) {
  return actionTypes.reduce(function(result, actionType) {
    result[actionType] = [namespace, actionType].join('/');
    return result;
  }, {})
}

module.exports = createTypes;
