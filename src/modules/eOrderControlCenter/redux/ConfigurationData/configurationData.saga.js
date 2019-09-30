import { takeLatest, call, put } from 'redux-saga/effects'
import { TYPES, ACTIONS } from './configurationData.actions'
import { ConfigurationDataApi } from '../../api/eOrderControlCenterApi'

function * configurationDataSaga () {
  yield takeLatest(TYPES.GET, getConfigurationData)
}

function * getConfigurationData (action) {
  try {
    const response = yield call(ConfigurationDataApi.getList)

    // Workaround for same operational departments ids
    let counter = 1

    response.value.sites.forEach(site => {
      site.operationalDepartments.forEach(od => {
        od.id = counter
        counter++
      })
    })

    yield put(ACTIONS.getSuccess(response.value))
  } catch (err) {
    yield put(ACTIONS.getFail(err))
  }
}

export default configurationDataSaga
