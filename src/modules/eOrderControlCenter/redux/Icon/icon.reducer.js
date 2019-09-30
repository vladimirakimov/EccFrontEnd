import { TYPES } from './icon.actions'

const INITIAL_STATE = {
  data: [],
  error: false,
  isLoading: false
}

const iconsReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.GET_LIST:
      return { ...state, isLoading: true }

    case TYPES.GET_LIST_SUCCESS: {
      return { ...state, data: action.payload.data.value, isLoading: false }
    }

    case TYPES.GET_LIST_FAIL: {
      return { ...state, error: true, isLoading: false }
    }

    case TYPES.CREATE_SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.data.value
        ]
      }
    }

    case TYPES.UPDATE_SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data.filter(icon => icon.id !== action.payload.data.value.id),
          action.payload.data.value
        ]
      }
    }

    case TYPES.DELETE_SUCCESS: {
      return {
        ...state,
        data: [...state.data.filter(icon => icon.id !== action.payload.data.value.id)]
      }
    }

    default:
      return state
  }
}

export default iconsReducer
