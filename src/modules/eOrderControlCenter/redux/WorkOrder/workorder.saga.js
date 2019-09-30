import { takeLatest, call, put } from 'redux-saga/effects'

import { TYPES, ACTIONS } from './workorder.actions'
import { WorkOrderApi as Api } from '../../api/eOrderControlCenterApi'

function * workordersSaga () {
  yield takeLatest(TYPES.GET_LIST, getList)
  yield takeLatest(TYPES.CREATE, create)
  yield takeLatest(TYPES.UPDATE, update)
  yield takeLatest(TYPES.DELETE, _delete)
}

function * getList (action) {
  try {
    const response = yield call(Api.getList, action.payload.page, action.payload.pageSize)
    yield put(ACTIONS.getListSuccess(response.data.map(data => transformWorkOrder(data))))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.getListFail(err))
  }
}

function * create (action) {
  try {
    const transformedPayload = transormCreateOrderPayload(action.payload.value)
    const response = yield call(Api.create, transformedPayload)

    const workOrder = {
      id: response.data,
      ...action.payload.value
    }
    yield put(ACTIONS.createSuccess(workOrder))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.createFail(err))
  }
}

function * update (action) {
  try {
    const payload = action.payload.value
    const { id, operation, ...order } = payload
    const transformedPayload = { id, operation, order }

    yield call(Api.update, transformedPayload)
    yield put(ACTIONS.updateSuccess(payload))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.updateFail(err))
  }
}

function * _delete (action) {
  try {
    const ids = action.payload.ids
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      yield call(Api._delete, id)
    }
    yield put(ACTIONS.deleteSuccess(action.payload.ids))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.deleteFail(err))
  }
}

const transormCreateOrderPayload = data => ({
  operation: data.operation,
  order: {
    site: data.site,
    customer: data.customer,
    operationalDepartment: data.operationalDepartment,
    licensePlateTruck: data.licensePlateTruck,
    licensePlateTrailer: data.licensePlateTrailer,
    container: data.container,
    containerLocation: data.containerLocation,
    dockingZone: data.dockingZone
  }
})

const transformWorkOrder = data => ({
  id: data.id,
  operation: data.operation,
  site: data.order.site,
  customer: data.order.customer,
  operationalDepartment: data.order.operationalDepartment,
  licensePlateTruck: data.order.licensePlateTruck,
  licensePlateTrailer: data.order.licensePlateTrailer,
  container: data.order.container,
  containerLocation: data.order.containerLocation,
  dockingZone: data.order.dockingZone
})

export default workordersSaga
