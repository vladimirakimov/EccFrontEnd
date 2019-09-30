import { takeLatest, call, put } from 'redux-saga/effects'

import { TYPES, ACTIONS } from './user.actions'
import { UserApi as Api } from '../../api/eOrderControlCenterApi'

function * usersSaga () {
  yield takeLatest(TYPES.GET_LIST, getList)
  yield takeLatest(TYPES.GET_BY_ID, getById)
  yield takeLatest(TYPES.CREATE, create)
  yield takeLatest(TYPES.UPDATE, update)
  yield takeLatest(TYPES.DELETE, _delete)
}

function * getList (action) {
  try {
    const response = yield call(Api.getList, action.payload.page, action.payload.pageSize)
    yield put(ACTIONS.getListSuccess(response.value))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.getListFail(err))
  }
}

function * getById (action) {
  try {
    const response = yield call(Api.getById, action.payload.id)
    yield put(ACTIONS.getByIdSuccess(response))
  } catch (err) {
    yield put(ACTIONS.getByIdFail(err))
  }
}

function * create (action) {
  try {
    yield call(Api.create, action.payload.value)
    const user = {
      id: window.localStorage.getItem('createdID'),
      ...action.payload.value
    }
    yield put(ACTIONS.createSuccess(user))
    yield put(ACTIONS.hideCreateDialog())
  } catch (err) {
    yield put(ACTIONS.createFail(err))
  }
}

function * update (action) {
  try {
    yield call(Api.patch, action.payload.value)
    yield put(ACTIONS.updateSuccess(action.payload.value))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.updateFail(err))
  }
}

function * _delete (action) {
  try {
    const id = action.payload.id
    yield call(Api._delete, id)
    yield put(ACTIONS.deleteSuccess(id))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.deleteFail(err))
  }
}

export default usersSaga
