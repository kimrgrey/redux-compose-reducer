const createTypes = (namespace, actionTypes) => (
  actionTypes.reduce((result, actionType) => {
    result[actionType] = `${namespace}/${actionType}`;
    return result;
  }, {})
);

module.exports = createTypes;
