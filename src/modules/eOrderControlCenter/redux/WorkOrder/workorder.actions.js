import { createTypes, actionCreator, async } from 'redux-action-creator'

export const TYPES = createTypes([
  ...async('GET_LIST'),
  ...async('CREATE'),
  ...async('UPDATE'),
  ...async('DELETE')
], 'WORKORDERS')

export const ACTIONS = {
  getList: actionCreator(TYPES.GET_LIST, 'page', 'pageSize'),
  getListSuccess: actionCreator(TYPES.GET_LIST_SUCCESS, 'data'),
  getListFail: actionCreator(TYPES.GET_LIST_FAIL, 'err'),

  create: actionCreator(TYPES.CREATE, 'value'),
  createSuccess: actionCreator(TYPES.CREATE_SUCCESS, 'data'),
  createFail: actionCreator(TYPES.CREATE_FAIL, 'err'),

  update: actionCreator(TYPES.UPDATE, 'value'),
  updateSuccess: actionCreator(TYPES.UPDATE_SUCCESS, 'data'),
  updateFail: actionCreator(TYPES.UPDATE_FAIL, 'err'),

  delete: actionCreator(TYPES.DELETE, 'ids'),
  deleteSuccess: actionCreator(TYPES.DELETE_SUCCESS, 'ids'),
  deleteFail: actionCreator(TYPES.DELETE_FAIL, 'err')
}
