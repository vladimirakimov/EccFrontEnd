import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import { TYPES, ACTIONS } from './source.actions'
import { SourceApi as Api } from '../../api/eOrderControlCenterApi'
// import { getSources, createSource as createSourceApi, updateSource as updateSourceApi, deleteSource as deleteSourceApi } from '../../api/sources.api'

function * sourcesSaga () {
  yield takeLatest(TYPES.GET_LIST, getList)
  yield takeLatest(TYPES.GET_BY_ID, getById)
  yield takeEvery(TYPES.CREATE_SOURCE, createSource)
  yield takeEvery(TYPES.UPDATE_SOURCE, updateSource)
  yield takeEvery(TYPES.DELETE_SOURCE, deleteSource)
}

function * getList (action) {
  try {
    const response = yield call(Api.getList)
    yield put(ACTIONS.getListSourcesSuccess(response.value))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.getListSourcesFail(err))
  }
}

function * getById (action) {
  try {
    const response = yield call(Api.getById, action.payload.id)
    yield put(ACTIONS.getByIdSuccess(response))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.getByIdFail(err))
  }
}

function * createSource (action) {
  console.log(action)
  try {
    const payload = action.payload.value
    const transformedBusinessUnits = payload.businessUnits.length ? payload.businessUnits.map(source => ({ name: source })) : null

    const transformedPayload = {
      name: payload.name,
      description: payload.description,
      businessUnits: transformedBusinessUnits
    }

    const response = yield call(Api.create, transformedPayload)
    const source = {
      ...payload,
      id: response.value
    }
    yield put(ACTIONS.createSourceSuccess(source))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.createSourceFail(err))
  }
}

function * updateSource (action) {
  try {
    const payload = action.payload.value
    const { id, name, description } = payload
    const transformedPayload = {
      id,
      name,
      description,
      businessUnits: action.payload.value.sourceBusinessUnits
    }
    yield call(Api.patch, transformedPayload)
    yield put(ACTIONS.updateSourceSuccess(payload))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.updateSourceFail(err))
  }
}

function * deleteSource (action) {
  try {
    const id = action.payload.id
    yield call(Api._delete, id)
    yield put(ACTIONS.deleteSourceSuccess(id))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.deleteSourceFail(err))
  }
}

export default sourcesSaga
