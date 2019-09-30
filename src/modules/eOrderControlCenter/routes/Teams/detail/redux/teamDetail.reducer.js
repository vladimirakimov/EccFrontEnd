import { TYPES } from './teamDetail.actions'

const INITIAL_STATE = {
  selectedTab: 'general'
}

const teamDetailReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.CHANGE_TAB:
      return { ...state, selectedTab: action.payload.tab }

    default:
      return state
  }
}

export default teamDetailReducer
