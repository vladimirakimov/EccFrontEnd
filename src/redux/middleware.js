import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { appLogger } from '../containers/App/redux/logger.middleware'
import { syncStaticAppData } from '../containers/App/redux/sync.middleware'

const logger = createLogger({
  collapsed: true
})

export const history = createHistory({
  basename: process.env.NODE_ENV === 'production' ? '/eOrderControlCenter' : ''
})

export const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)

const middlewares = [
  sagaMiddleware,
  logger,
  routeMiddleware,
  appLogger,
  syncStaticAppData
]

export default middlewares
