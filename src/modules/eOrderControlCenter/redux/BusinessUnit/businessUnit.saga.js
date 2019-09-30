import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'

import { TYPES, ACTIONS } from './businessUnit.actions'
import { BusinessUnitApi as Api } from '../../api/eOrderControlCenterApi'

function * businessUnitsSaga () {
  yield takeLatest(TYPES.GET_LIST, getList)
  yield takeLatest(TYPES.GET_BY_ID, getById)
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

function * getById (action) {
  console.log(action)
  try {
    const response = yield call(Api.getById, action.payload.id)
    yield put(ACTIONS.getByIdSuccess(response))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.getByIdFail(err))
  }
}

function * create (action) {
  try {
    const payload = action.payload.value
    const response = yield call(Api.create, payload)
    const businessUnit = {
      ...action.payload.value,
      id: response.value
    }
    yield put(ACTIONS.createSuccess(businessUnit))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.createFail(err))
  }
}

function * update (action) {
  try {
    const payload = action.payload.value
    yield call(Api.patch, payload)
    yield put(ACTIONS.updateSuccess(payload))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.updateFail(err))
  }
}

function * _delete (action) {
  try {
    const id = action.payload.id
    yield call(Api._delete, id)
    yield put(ACTIONS.deleteSuccess(action.payload.id))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.deleteFail(err))
  }
}

export default businessUnitsSaga
