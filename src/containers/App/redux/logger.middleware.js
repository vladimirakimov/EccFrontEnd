import { ACTIONS } from './logger.actions'

export const appLogger = store => next => action => {
  if (action.type.indexOf('FAIL') > -1) {
    const error = action.payload.err.response ? action.payload.err.response.data.error.details[0] : {}

    store.dispatch(ACTIONS.loggerOpen({
      message: error.message,
      type: ''
    }))
  }
  next(action)
}
