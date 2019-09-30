import { TYPES } from './source.actions'

const INITIAL_STATE = {
  data: [],
  selectedSource: null,
  error: false,
  isLoading: false
}

export default function sourceReducer (state = INITIAL_STATE, action) {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.GET_LIST:
      return { ...state, isLoading: true }

    case TYPES.GET_LIST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      }
    }

    case TYPES.GET_LIST_FAIL: {
      return {
        ...state,
        error: true,
        isLoading: false
      }
    }

    case TYPES.GET_BY_ID:
      return {
        ...state,
        selectedSource: null,
        isLoading: true
      }

    case TYPES.GET_BY_ID_SUCCESS:
      return {
        ...state,
        data: [...state.data.map(source => source.id === action.payload.data.id ? action.payload.data : source)],
        selectedSource: action.payload.data,
        isLoading: false
      }

    case TYPES.GET_BY_ID_FAIL:
      return {
        ...state,
        selectedSource: null,
        isLoading: false
      }

    case TYPES.CREATE_SOURCE:
      return {
        ...state,
        isLoading: true
      }

    case TYPES.CREATE_SOURCE_SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.data
        ],
        isLoading: false
      }
    }

    case TYPES.CREATE_SOURCE_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    case TYPES.UPDATE_SOURCE:
      return { ...state }

    case TYPES.UPDATE_SOURCE_SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data.filter(source => source.id !== action.payload.data.id),
          action.payload.data
        ]
      }
    }

    case TYPES.UPDATE_SOURCE_FAIL:
      return {
        ...state,
        error: true
      }

    case TYPES.DELETE_SOURCE:
      return { ...state, isLoading: true }

    case TYPES.DELETE_SOURCE_SUCCESS: {
      return {
        ...state,
        data: state.data.filter(source => source.id !== action.payload.id),
        isLoading: false
      }
    }

    case TYPES.DELETE_SOURCE_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    default:
      return state
  }
}
