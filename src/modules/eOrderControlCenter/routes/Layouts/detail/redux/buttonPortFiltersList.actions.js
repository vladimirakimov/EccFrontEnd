import { createTypes } from 'redux-action-creator'

import {
  createDxGridActionCreators,
  dxGridActionTypes
} from '~/utils/dxGridHelpers'

export const TYPES = createTypes([
  ...dxGridActionTypes
], 'LAYOUTS_BUTTON_PORT_FILTERS')

export const ACTIONS = {
  ...createDxGridActionCreators(TYPES)
}
