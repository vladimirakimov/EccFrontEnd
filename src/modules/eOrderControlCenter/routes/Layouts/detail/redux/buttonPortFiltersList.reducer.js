import { TYPES } from './buttonPortFiltersList.actions'
import { reduceDxGridActions, dxGridInitialState } from '~/utils/dxGridHelpers'

const INITIAL_STATE = {
  ...dxGridInitialState
}

const layoutsButtonPortFiltersList = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  state = reduceDxGridActions(TYPES, action, state, {
    property: '',
    value: '',
    type: ''
  })

  return state
}

export default layoutsButtonPortFiltersList
