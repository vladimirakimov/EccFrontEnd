import { createTypes, actionCreator } from 'redux-action-creator'

export const TYPES = createTypes([
  'CHANGE_TAB',
  'TOOGLE_ZOOM'
], 'LAYOUT_DETAIL')

export const ACTIONS = {
  changeTab: actionCreator(TYPES.CHANGE_TAB, 'tab'),
  toggleDiagramWidgetZoom: actionCreator(TYPES.TOOGLE_ZOOM)
}
