import { createTypes, actionCreator, async } from 'redux-action-creator'

export const TYPES = createTypes([
  ...async('GET_LIST'),
  ...async('GET_BY_ID'),
  ...async('CREATE'),
  ...async('UPDATE'),
  ...async('DELETE')
], 'BUSINESSUNITS')

export const ACTIONS = {
  getList: actionCreator(TYPES.GET_LIST),
  getListSuccess: actionCreator(TYPES.GET_LIST_SUCCESS, 'data'),
  getListFail: actionCreator(TYPES.GET_LIST_FAIL, 'err'),

  create: actionCreator(TYPES.CREATE, 'value'),
  createSuccess: actionCreator(TYPES.CREATE_SUCCESS, 'data'),
  createFail: actionCreator(TYPES.CREATE_FAIL, 'err'),

  getById: actionCreator(TYPES.GET_BY_ID, 'id'),
  getByIdSuccess: actionCreator(TYPES.GET_BY_ID_SUCCESS, 'data'),
  getByIdFail: actionCreator(TYPES.GET_BY_ID_FAIL, 'err'),

  update: actionCreator(TYPES.UPDATE, 'value'),
  updateSuccess: actionCreator(TYPES.UPDATE_SUCCESS, 'data'),
  updateFail: actionCreator(TYPES.UPDATE_FAIL, 'err'),

  delete: actionCreator(TYPES.DELETE, 'id'),
  deleteSuccess: actionCreator(TYPES.DELETE_SUCCESS, 'id'),
  deleteFail: actionCreator(TYPES.DELETE_FAIL, 'err')
}
