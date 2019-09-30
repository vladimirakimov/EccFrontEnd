import { TYPES } from './workorder.actions'

const DEFAULT_STATE = {
  data: null,
  error: false,
  isLoading: false
}

const workordersReducer = (state = DEFAULT_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.GET_LIST:
      return { ...state, isLoading: true }

    case TYPES.GET_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      }

    case TYPES.GET_LIST_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    case TYPES.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case TYPES.CREATE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.data
        ],
        isLoading: false
      }

    case TYPES.CREATE_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    case TYPES.UPDATE:
      return {
        ...state,
        isLoading: true
      }

    case TYPES.UPDATE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data.filter(x => x.id !== action.payload.data.id),
          action.payload.data
        ],
        isLoading: false
      }

    case TYPES.UPDATE_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    case TYPES.DELETE:
      return {
        ...state,
        isLoading: true
      }

    case TYPES.DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(x => action.payload.ids.indexOf(x.id) < 0),
        isLoading: false
      }

    case TYPES.DELETE_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    default:
      return state
  }
}

export default workordersReducer
