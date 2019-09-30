import { TYPES } from './workOrderList.actions'
import { reduceDxGridActions, dxGridInitialState } from '../../../../../../utils/dxGridHelpers'

const INITIAL_STATE = {
  ...dxGridInitialState
}

const workOrderListReducer = (state = INITIAL_STATE, action) => {
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

export default workOrderListReducer
