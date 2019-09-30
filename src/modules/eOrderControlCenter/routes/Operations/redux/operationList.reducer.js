import { TYPES } from './operationList.actions'
import { dxGridInitialState, reduceDxGridActions } from '../../../../../utils/dxGridHelpers'

const INITIAL_STATE = {
  ...dxGridInitialState,
  columnOrder: ['name', 'description', 'tags'],
  sorting: [{ columnName: 'name', direction: 'asc' }],
  columnWidths: [
    { columnName: 'name', width: 180 },
    { columnName: 'description', width: 180 },
    { columnName: 'tags', width: 180 }
  ]
}

const operationListReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  state = reduceDxGridActions(TYPES, action, state, {
    name: '',
    description: '',
    tags: []
  })

  return state
}

export default operationListReducer
