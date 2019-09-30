import { TYPES } from './teamOperator.actions'

const INITIAL_STATE = {
  data: [],
  error: false,
  isLoading: false
}

export default function workOrderPropertyReducer (state = INITIAL_STATE, action) {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.GET:
      return {
        ...state,
        isLoading: true
      }

    case TYPES.GET_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      }

    case TYPES.GET_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    default:
      return state
  }
}
