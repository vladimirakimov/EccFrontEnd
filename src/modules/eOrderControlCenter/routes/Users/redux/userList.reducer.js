import { TYPES } from './userList.actions'
import { reduceDxGridActions, dxGridInitialState } from '../../../../../utils/dxGridHelpers'

const INITIAL_STATE = {
  ...dxGridInitialState
}

const userListReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  state = reduceDxGridActions(TYPES, action, state, {
    firstname: '',
    lastname: '',
    login: ''
  })

  return state
}

export default userListReducer
