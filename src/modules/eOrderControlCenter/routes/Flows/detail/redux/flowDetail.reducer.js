import { TYPES } from './flowDetail.actions'

const INITIAL_STATE = {
  selectedTab: 'general'
}

const flowDetailReducer = (state = INITIAL_STATE, action) => {
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

export default flowDetailReducer
