import { createTypes } from 'redux-action-creator'
import { createDxGridActionCreators, dxGridActionTypes } from '../../../../../utils/dxGridHelpers'

export const TYPES = createTypes([
  ...dxGridActionTypes
], 'BUSINESSUNIT_PAGE')

export const ACTIONS = {
  ...createDxGridActionCreators(TYPES)
}
