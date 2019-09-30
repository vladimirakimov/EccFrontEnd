import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES } from '~/modules/eOrderControlCenter/routes/config'
import { generateRoute } from '~/utils/routeGenerator'
import { TYPES, ACTIONS } from './layout.actions'
import { LayoutApi as Api } from '../../api/eOrderControlCenterApi'

function * layoutsSaga () {
  yield takeLatest(TYPES.GET_LIST, getList)
  yield takeLatest(TYPES.GET_BY_ID, getById)
  yield takeEvery(TYPES.CREATE, create)
  yield takeEvery(TYPES.UPDATE, update)
  yield takeEvery(TYPES.DELETE, _delete)
}

function * getList (action) {
  try {
    const response = yield call(Api.getList)
    response.value = transformListResponse(response.value)
    yield put(ACTIONS.getListSuccess(response))
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
    const payload = action.payload.value
    yield call(Api.create, payload)

    const id = window.localStorage.getItem('createdID')
    const newLayout = { ...payload, id }

    yield put(ACTIONS.createSuccess(newLayout))
    yield put(ACTIONS.hideCreateDialog())
    yield put(push(generateRoute(ROUTES.LAYOUTDETAIL, { id })))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.createFail(err))
  }
}

function * update (action) {
  console.log(action)
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
    yield put(ACTIONS.deleteSuccess(id))
    yield put(push(generateRoute(ROUTES.LAYOUTS)))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.deleteFail(err))
  }
}

function transformListResponse (data) {
  return data.map(x => {
    let description = x.description || ''
    if (description.length > 100) {
      description = `${description.substring(0, 100)}…`
    }

    return {
      ...x,
      description
    }
  })
}

export default layoutsSaga
