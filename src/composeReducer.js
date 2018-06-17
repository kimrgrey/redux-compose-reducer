function defaultFallback(state) {
  return state;
}

function composeReducer(namespace, mapping, initialState, fallback) {
  var namespacedMapping = {};

  Object.keys(mapping).map(function(key) {
    var newkey = [namespace, key].join('/');
    namespacedMapping[newkey] = mapping[key];
  });

  return function(state, action) {
    var handler = namespacedMapping[action.type];

    return (
      handler 
        ? handler(state || initialState, action) 
        : (fallback || defaultFallback)(state || initialState, action)
    );
  }
}

module.exports = composeReducer;
