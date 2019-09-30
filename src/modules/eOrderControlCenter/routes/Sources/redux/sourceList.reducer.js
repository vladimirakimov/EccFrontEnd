import { TYPES } from './sourceList.actions'
import { reduceDxGridActions, dxGridInitialState } from '../../../../../utils/dxGridHelpers'

const INITIAL_STATE = {
  ...dxGridInitialState,
  columnOrder: ['name', 'description', 'businessUnits'],
  sorting: [{ columnName: 'name', direction: 'asc' }],
  columnWidths: [
    { columnName: 'name', width: 180 },
    { columnName: 'description', width: 180 },
    { columnName: 'businessUnits', width: 540 }
  ]
}

const sourceListReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  state = reduceDxGridActions(TYPES, action, state, {
    name: '',
    description: '',
    businessUnits: []
  })

  return state
}

export default sourceListReducer
