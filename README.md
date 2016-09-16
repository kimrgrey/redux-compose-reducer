# Redux Compose Reducer

Reducer's composer for Redux. This library simplifies workflow for building namespaced actions and reducers for them in Redux.

## Installation

```
npm install --save redux-compose-reducer
```

## Usage

To create namespaced types for your actions you can use function `createTypes` in this way:

```js
import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('app', [
  'openSideBar',
  'closeSideBar'
]);

export const openSideBar = () => ({
  type: TYPES.openSideBar
});

export const closeSideBar = () => ({
  type: TYPES.closeSideBar
});
```

After it you need to create reducers for this types, right? Try this:

```js
import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  open: false
};

const openSideBar = (state) => ({
  ...state,
  open: true
});

const closeSideBar = (state) => ({
  ...state,
  open: false
});

export default composeReducer('app', {
  openSideBar,
  closeSideBar
}, initialState);
```

## Tests

If you want to run tests just execute:

```
npm test
```
