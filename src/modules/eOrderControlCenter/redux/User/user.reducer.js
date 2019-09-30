import { TYPES } from './user.actions'

const DEFAULT_STATE = {
  data: null,
  selectedUser: null,
  error: false,
  errors: [],
  createModal: false,
  isLoading: false
}

const usersReducer = (state = DEFAULT_STATE, action) => {
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

    case TYPES.GET_BY_ID:
      return {
        ...state,
        selectedUser: null,
        isLoading: true
      }
    case TYPES.GET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload.data,
        isLoading: false
      }
    case TYPES.GET_BY_ID_FAIL:
      return {
        ...state,
        selectedUser: null,
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
        errors: action.payload.err.response.data.error.details,
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
        data: state.data.filter(user => action.payload.id !== user.id),
        isLoading: false
      }
    case TYPES.DELETE_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    case TYPES.SHOW_CREATE_DIALOG:
      return {
        ...state,
        createModal: true
      }

    case TYPES.HIDE_CREATE_DIALOG:
      return {
        ...state,
        errors: [],
        createModal: false
      }

    default:
      return state
  }
}

export default usersReducer
