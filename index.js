const composeReducer = (namespace, mapping, initialState, fallback = state => state) => {
  const namespacedMapping = Object.keys(mapping).map(key => `${namespace}/${key}`)
  return (state = initialState, action ) => {
    const handler = namespacedMapping[action.type];
    return handler ? handler(state, action) : fallback(state, action);
  }
}

module.exports = {
	composeReducer
};
