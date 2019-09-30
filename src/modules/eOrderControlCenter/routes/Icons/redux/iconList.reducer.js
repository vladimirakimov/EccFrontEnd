import { TYPES } from './iconList.actions'
import { dxGridInitialState, reduceDxGridActions } from '../../../../../utils/dxGridHelpers'

const INITIAL_STATE = {
  ...dxGridInitialState,
  columnOrder: ['name', 'dataPath'],
  sorting: [{ columnName: 'name', direction: 'asc' }]
}

const operationListReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  state = reduceDxGridActions(TYPES, action, state, {
    name: '',
    dataPath: ''
  })

  return state
}

export default operationListReducer
