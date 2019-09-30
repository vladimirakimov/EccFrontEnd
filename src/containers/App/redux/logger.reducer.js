import { TYPES as LOGGER_TYPES } from './logger.actions'
const DEFAULT_STATE = {
  message: null,
  type: null
}

const loggerReducer = (state = DEFAULT_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case LOGGER_TYPES.LOGGER_OPEN:
      return Object.assign({}, state, {
        message: action.payload.meta.message,
        type: action.payload.meta.type
      })

    case LOGGER_TYPES.LOGGER_CLOSE:
      return Object.assign({}, DEFAULT_STATE)

    default:
      return state
  }
}

export default loggerReducer
