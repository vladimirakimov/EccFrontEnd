import { createTypes } from 'redux-action-creator'

import {
  createDxGridActionCreators,
  dxGridActionTypes
} from '~/utils/dxGridHelpers'

export const TYPES = createTypes([
  ...dxGridActionTypes
], 'LAYOUTS_WORK_ORDER_BUTTONS')

export const ACTIONS = {
  ...createDxGridActionCreators(TYPES)
}
