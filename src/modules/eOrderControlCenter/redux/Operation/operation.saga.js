import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'

import { TYPES, ACTIONS } from './operation.actions'
import { OperationApi as Api } from '../../api/eOrderControlCenterApi'

function * businessUnitsSaga () {
  yield takeLatest(TYPES.GET_LIST, getList)
  yield takeEvery(TYPES.CREATE, create)
  yield takeEvery(TYPES.UPDATE, update)
  yield takeEvery(TYPES.DELETE, _delete)
}

function * getList (action) {
  try {
    const response = yield call(Api.getList)
    yield put(ACTIONS.getListSuccess(response.value))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.getListFail(err))
  }
}

function * create (action) {
  try {
    const payload = action.payload.value
    const response = yield call(Api.create, payload)
    yield put(ACTIONS.createSuccess(response))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.createFail(err))
  }
}

function * update (action) {
  try {
    const payload = action.payload.value
    console.log(payload)
    const response = yield call(Api.update, payload)
    yield put(ACTIONS.updateSuccess(response))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.updateFail(err))
  }
}

function * _delete (action) {
  try {
    const payload = action.payload.value
    yield call(Api._delete, payload)
    yield put(ACTIONS.deleteSuccess(payload))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.deleteFail(err))
  }
}

export default businessUnitsSaga
