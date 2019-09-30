import { TYPES } from './operation.actions'

const INITIAL_STATE = {
  data: [],
  error: false,
  isLoading: false
}

const operationsReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.GET_LIST:
      return { ...state, isLoading: true }

    case TYPES.GET_LIST_SUCCESS: {
      return { ...state, data: action.payload.data, isLoading: false }
    }

    case TYPES.GET_LIST_FAIL: {
      return { ...state, error: true, isLoading: false }
    }

    case TYPES.CREATE_SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.data
        ]
      }
    }

    case TYPES.UPDATE_SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data.filter(operation => operation.id !== action.payload.data.id),
          action.payload.data
        ]
      }
    }

    case TYPES.DELETE_SUCCESS: {
      return {
        ...state,
        data: [...state.data.filter(operation => operation.id !== action.payload.data.id)]
      }
    }

    default:
      return state
  }
}

export default operationsReducer
