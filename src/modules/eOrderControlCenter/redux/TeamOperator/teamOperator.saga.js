import { takeLatest, call, put } from 'redux-saga/effects'
import { TYPES, ACTIONS } from './teamOperator.actions'
import { TeamOperatorApi } from '../../api/eOrderControlCenterApi'

function * teamOperatorSaga () {
  yield takeLatest(TYPES.GET, getTeamOperatorsList)
}

function * getTeamOperatorsList (action) {
  try {
    const response = yield call(TeamOperatorApi.getList)
    yield put(ACTIONS.getSuccess(response.value))
  } catch (err) {
    yield put(ACTIONS.getFail(err))
  }
}

export default teamOperatorSaga
