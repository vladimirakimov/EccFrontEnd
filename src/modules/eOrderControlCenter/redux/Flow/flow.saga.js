import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES } from '~/modules/eOrderControlCenter/routes/config'
import { generateRoute } from '~/utils/routeGenerator'
import { TYPES, ACTIONS } from './flow.actions'
import { FlowApi as Api } from '../../api/eOrderControlCenterApi'

function * flowsSaga () {
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
    console.log(err)
    yield put(ACTIONS.getByIdFail(err))
  }
}

function * create (action) {
  try {
    const payload = action.payload.value
    yield call(Api.create, payload)

    const id = window.localStorage.getItem('createdID')
    const newFlow = { ...payload, id }

    yield put(ACTIONS.createSuccess(newFlow))
    yield put(ACTIONS.hideCreateDialog())
    yield put(push(generateRoute(ROUTES.FLOWDETAIL, { id })))
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
  console.log('payload', action)
  try {
    const id = action.payload.id
    yield call(Api._delete, id)
    yield put(ACTIONS.deleteSuccess(id))
    yield put(push(generateRoute(ROUTES.FLOWS)))
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

function transformPayload (payload) {
  return {
    ...payload,
    sources: payload.sources.map(x => x.value),
    sites: payload.sites.map(x => x.value),
    operations: payload.operations.map(x => x.value),
    operationalDepartments: payload.operationalDepartments.map(x => x.value),
    typePlannings: payload.typePlannings.map(x => x.value),
    customers: payload.customers.map(x => x.value),
    productionSites: payload.productionSites.map(x => x.value),
    transportTypes: payload.transportTypes.map(x => x.value)
  }
}

function transformResponse (response) {
  return {
    ...response,
    sources: response.sources.map(x => ({ label: x, value: x })),
    sites: response.sites.map(x => ({ label: x, value: x })),
    operations: response.operations.map(x => ({ label: x, value: x })),
    operationalDepartments: response.operationalDepartments.map(x => ({ label: x, value: x })),
    typePlannings: response.typePlannings.map(x => ({ label: x, value: x })),
    customers: response.customers.map(x => ({ label: x, value: x })),
    productionSites: response.productionSites.map(x => ({ label: x, value: x })),
    transportTypes: response.transportTypes.map(x => ({ label: x, value: x }))
  }
}

export default flowsSaga
