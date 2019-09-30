import { createTypes, actionCreator, async } from 'redux-action-creator'

export const TYPES = createTypes([
  ...async('GET')
], 'TEAMOPERATOR')

export const ACTIONS = {
  get: actionCreator(TYPES.GET),
  getSuccess: actionCreator(TYPES.GET_SUCCESS, 'data'),
  getFail: actionCreator(TYPES.GET_FAIL, 'err')
}
