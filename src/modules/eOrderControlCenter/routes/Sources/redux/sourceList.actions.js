import { createTypes } from 'redux-action-creator'
import { createDxGridActionCreators, dxGridActionTypes } from '../../../../../utils/dxGridHelpers'

export const TYPES = createTypes([
  ...dxGridActionTypes
], 'SOURCES_PAGE')

export const ACTIONS = {
  ...createDxGridActionCreators(TYPES)
}
