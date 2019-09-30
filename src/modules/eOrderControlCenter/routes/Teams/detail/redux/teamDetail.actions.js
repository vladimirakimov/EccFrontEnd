import { createTypes, actionCreator } from 'redux-action-creator'

export const TYPES = createTypes([
  'CHANGE_TAB'
], 'TEAM_DETAIL')

export const ACTIONS = {
  changeTab: actionCreator(TYPES.CHANGE_TAB, 'tab')
}
