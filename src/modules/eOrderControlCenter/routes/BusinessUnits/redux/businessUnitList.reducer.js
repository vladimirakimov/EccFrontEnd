import { TYPES } from './businessUnitList.actions'
import { dxGridInitialState, reduceDxGridActions } from '../../../../../utils/dxGridHelpers'

const INITIAL_STATE = {
  ...dxGridInitialState,
  columnOrder: ['name'],
  sorting: [{ columnName: 'name', direction: 'asc' }],
  columnWidths: [
    { columnName: 'name', width: 180 }
  ]
}

const businessUnitListReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  state = reduceDxGridActions(TYPES, action, state, { name: '' })

  return state
}

export default businessUnitListReducer
