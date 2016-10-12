const defaultFallback = state => state;

const composeReducer = (namespace, mapping, initialState, fallback = defaultFallback) => {
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

module.exports = composeReducer;
