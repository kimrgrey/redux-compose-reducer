# Redux Compose Reducer [![build status](https://travis-ci.com/kimrgrey/redux-compose-reducer.svg?branch=master)](https://travis-ci.com/kimrgrey/redux-compose-reducer) [![npm version](https://img.shields.io/npm/v/redux-compose-reducer.svg?style=flat-square)](https://www.npmjs.com/package/redux-compose-reducer) [![npm downloads](https://img.shields.io/npm/dm/redux-compose-reducer.svg?style=flat-square)](https://www.npmjs.com/package/redux-compose-reducer) [![license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Reducer's composer for Redux. This library simplifies workflow for building actions (general and namespaced) and reducers for them in Redux.

## Installation

Install from the NPM repository using `yarn` or `npm`:

```
yarn add redux-compose-reducer
```

```
npm install --save redux-compose-reducer
```

## Usage

To create types for your actions you can use function `createTypes` in this way:

```js
import { createTypes } from 'redux-compose-reducer'

export const TYPES = createTypes(['openSideBar', 'closeSideBar'])

export const openSideBar = () => ({
  type: TYPES.openSideBar,
})

export const closeSideBar = () => ({
  type: TYPES.closeSideBar,
})
```

After it you need to create reducers for this types, right? Try this:

```js
import { composeReducer } from 'redux-compose-reducer'
import { TYPES } from './actions'

const openSideBar = state => ({
  ...state,
  open: true,
})

// if your reducer doesn't require state and action
// you can declare it as object that describes changes
const closeSideBar = { open: false }

export default composeReducer({
  types: TYPES,
  initialState: { open: false },
  reducers: {
    openSideBar,
    closeSideBar,
  },
})
```

## Usage with namespaces

To create `namespaced` types you need to update `createTypes` function call:

```js
import { createTypes } from 'redux-compose-reducer'

export const TYPES = createTypes('app', ['openSideBar', 'closeSideBar'])

```

In such case your `TYPES` object will be:

```js
{
  openSideBar: 'app/openSideBar',
  closeSideBar: 'app/closeSideBar',
}
```

Your reducer's code remains the same (see previous example).
