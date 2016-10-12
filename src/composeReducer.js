function defaultFallback(state) {
  return state;
}

function composeReducer(namespace, mapping, initialState, fallback) {
  const namespacedMapping = {};

  Object.keys(mapping).map(function(key) {
    const newkey = [namespace, key].join('/');
    namespacedMapping[newkey] = mapping[key];
  });

  return function(state, action) {
    const handler = namespacedMapping[action.type];
    
    return (
      handler 
        ? handler(state || initialState, action) 
        : (fallback || defaultFallback)(state || initialState, action)
    );
  }
}

module.exports = composeReducer;
