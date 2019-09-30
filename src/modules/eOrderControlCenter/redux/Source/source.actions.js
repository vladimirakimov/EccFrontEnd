import { createTypes, actionCreator, async } from 'redux-action-creator'

export const TYPES = createTypes([
  ...async('GET_LIST'),
  ...async('GET_BY_ID'),
  ...async('CREATE_SOURCE'),
  ...async('UPDATE_SOURCE'),
  ...async('DELETE_SOURCE')
], 'SOURCES')

export const ACTIONS = {
  getListSources: actionCreator(TYPES.GET_LIST),
  getListSourcesSuccess: actionCreator(TYPES.GET_LIST_SUCCESS, 'data'),
  getListSourcesFail: actionCreator(TYPES.GET_LIST_FAIL, 'err'),

  getById: actionCreator(TYPES.GET_BY_ID, 'id'),
  getByIdSuccess: actionCreator(TYPES.GET_BY_ID_SUCCESS, 'data'),
  getByIdFail: actionCreator(TYPES.GET_BY_ID_FAIL, 'err'),

  createSource: actionCreator(TYPES.CREATE_SOURCE, 'value'),
  createSourceSuccess: actionCreator(TYPES.CREATE_SOURCE_SUCCESS, 'data'),
  createSourceFail: actionCreator(TYPES.CREATE_SOURCE_FAIL, 'err'),

  updateSource: actionCreator(TYPES.UPDATE_SOURCE, 'value'),
  updateSourceSuccess: actionCreator(TYPES.UPDATE_SOURCE_SUCCESS, 'data'),
  updateSourceFail: actionCreator(TYPES.UPDATE_SOURCE_FAIL, 'err'),

  deleteSource: actionCreator(TYPES.DELETE_SOURCE, 'id'),
  deleteSourceSuccess: actionCreator(TYPES.DELETE_SOURCE_SUCCESS, 'id'),
  deleteSourceFail: actionCreator(TYPES.DELETE_SOURCE_FAIL, 'err')
}
