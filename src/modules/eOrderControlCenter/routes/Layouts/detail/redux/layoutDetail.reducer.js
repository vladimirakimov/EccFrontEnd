import { TYPES } from './layoutDetail.actions'

const INITIAL_STATE = {
  selectedTab: 'definition',
  diagramWidgetZoom: true
}

const layoutDetailReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.CHANGE_TAB:
      return { ...state, selectedTab: action.payload.tab }

    case TYPES.TOOGLE_ZOOM:
      return { ...state, diagramWidgetZoom: !state.diagramWidgetZoom }

    default:
      return state
  }
}

export default layoutDetailReducer
