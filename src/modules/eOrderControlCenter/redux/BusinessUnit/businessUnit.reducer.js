import { TYPES } from './businessUnit.actions'

const INITIAL_STATE = {
  data: [],
  selectedBusinessUnit: null,
  error: false,
  isLoading: false
}

const businessUnitsReducer = (state = INITIAL_STATE, action) => {
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

    case TYPES.GET_BY_ID:
      return {
        ...state,
        selectedBusinessUnit: null
      }

    case TYPES.GET_BY_ID_SUCCESS:
      return {
        ...state,
        data: [...state.data.map(businessUnit => businessUnit.id === action.payload.data.id ? action.payload.data : businessUnit)],
        selectedBusinessUnit: action.payload.data
      }

    case TYPES.GET_BY_ID_FAIL:
      return {
        ...state,
        selectedBusinessUnit: null
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
          ...state.data.filter(businessUnit => businessUnit.id !== action.payload.data.id),
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
        data: state.data.filter(businessUnit => businessUnit.id !== action.payload.id),
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

export default businessUnitsReducer
