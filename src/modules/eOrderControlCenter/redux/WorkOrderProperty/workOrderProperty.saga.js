import { takeLatest, call, put } from 'redux-saga/effects'
import { TYPES, ACTIONS } from './workOrderProperty.actions'
import { WorkOrderPropertyApi } from '../../api/eOrderControlCenterApi'

function * workOrderPropertySaga () {
  yield takeLatest(TYPES.GET, getWorkOrderProperties)
}

function * getWorkOrderProperties (action) {
  try {
    const { data } = yield call(WorkOrderPropertyApi.getList)
    yield put(ACTIONS.getSuccess(data))
  } catch (err) {
    yield put(ACTIONS.getFail(err))
  }
}

export default workOrderPropertySaga
