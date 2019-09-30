import { TYPES } from './user.actions'

const DEFAULT_STATE = {}

const userReducer = (state = DEFAULT_STATE, action) => {
  const { UPDATE } = TYPES

  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case UPDATE:
      return Object.assign({}, state, {
        ...action.payload.user
      })
    default:
      return state
  }
}

export default userReducer
