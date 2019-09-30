import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'
import sagas from './sagas'
import middleware, { sagaMiddleware } from './middleware'

const store = createStore(reducers, {}, composeWithDevTools(
  applyMiddleware(...middleware)
))

sagaMiddleware.run(sagas)

export default store
