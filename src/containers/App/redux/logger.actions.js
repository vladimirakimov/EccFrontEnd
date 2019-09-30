import { createTypes, actionCreator } from 'redux-action-creator'

export const TYPES = createTypes([
  'LOGGER_CLOSE',
  'LOGGER_OPEN'
], 'LOGGER')

export const ACTIONS = {
  loggerClose: actionCreator(TYPES.LOGGER_CLOSE),
  loggerOpen: actionCreator(TYPES.LOGGER_OPEN, 'meta')
}
