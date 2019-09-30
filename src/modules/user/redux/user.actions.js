import { createTypes, actionCreator } from 'redux-action-creator'

export const TYPES = createTypes([
  'UPDATE'
], 'USER')

export const ACTIONS = {
  updateUser: actionCreator(TYPES.UPDATE, 'user')
}
