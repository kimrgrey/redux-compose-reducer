const createTypes = (namespace, actionTypes) => (
  actionTypes.reduce((result, actionType) => {
    result[actionType] = `${namespace}/${actionType}`;
    return result;
  }, {})
);

const composeReducer = (namespace, mapping, initialState, fallback = state => state) => {
  const namespacedMapping = {};
  
  Object.keys(mapping).map((key) => {
    const newkey = `${namespace}/${key}`;
    namespacedMapping[newkey] = mapping[key];
  });
  
  return (state = initialState, action ) => {
    const handler = namespacedMapping[action.type];
    return handler ? handler(state, action) : fallback(state, action);
  }
};

module.exports = {
  composeReducer,
  createTypes
};
