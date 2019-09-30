import { createTypes, actionCreator } from 'redux-action-creator'

export const TYPES = createTypes([
  'SET_TITLE',
  'TOGGLE_THEME',
  'TOGGLE_SIDEBAR'
], 'UI')

export const ACTIONS = {
  setTitle: actionCreator(TYPES.SET_TITLE),
  toggleTheme: actionCreator(TYPES.TOGGLE_THEME),
  toggleSidebar: actionCreator(TYPES.TOGGLE_SIDEBAR)
}
