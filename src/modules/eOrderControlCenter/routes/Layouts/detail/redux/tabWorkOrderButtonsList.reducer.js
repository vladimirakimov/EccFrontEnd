import { TYPES } from './tabWorkOrderButtonsList.actions'
import { reduceDxGridActions, dxGridInitialState } from '~/utils/dxGridHelpers'

const INITIAL_STATE = {
  ...dxGridInitialState
}

const layoutsTabWorkOrderButtonsList = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  state = reduceDxGridActions(TYPES, action, state, {
    property: '',
    highlight: false,
    showCaption: false,
    sortSequence: '',
    sortOrder: '',
    hideOnButton: false
  })

  return state
}

export default layoutsTabWorkOrderButtonsList
