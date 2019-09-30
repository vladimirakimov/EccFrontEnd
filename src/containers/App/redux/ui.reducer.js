import { TYPES } from './ui.actions'

const DEFAULT_STATE = {
  title: 'Control Center',
  isDarkThemeSelected: false,
  isSidebarCollapsed: false
}

export default function uiReducer (state = DEFAULT_STATE, action) {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.SET_TITLE:
      return {
        ...state,
        title: action.payload
      }
    case TYPES.TOGGLE_THEME:
      return {
        ...state,
        isDarkThemeSelected: !state.isDarkThemeSelected
      }
    case TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed
      }

    default:
      return state
  }
}
