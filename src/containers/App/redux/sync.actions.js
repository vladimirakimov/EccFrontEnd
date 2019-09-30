import { createTypes, actionCreator } from 'redux-action-creator'

export const TYPES = createTypes([
  'GET_STATIC_APP_DATA'
], 'SYNC')

export const ACTIONS = {
  getStaticAppData: actionCreator(TYPES.GET_STATIC_APP_DATA)
}
