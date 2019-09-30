import { all, fork } from 'redux-saga/effects'

import configurationData from '../modules/eOrderControlCenter/redux/ConfigurationData/configurationData.saga'
import teamsSaga from '../modules/eOrderControlCenter/redux/Team/team.saga'
import teamsOperatorsSaga from '../modules/eOrderControlCenter/redux/TeamOperator/teamOperator.saga'
import usersSaga from '../modules/eOrderControlCenter/redux/User/user.saga'
import sourcesSaga from '../modules/eOrderControlCenter/redux/Source/source.saga'
import operationsSaga from '../modules/eOrderControlCenter/redux/Operation/operation.saga'
import businessUnitsSaga from '../modules/eOrderControlCenter/redux/BusinessUnit/businessUnit.saga'
import iconsSaga from '../modules/eOrderControlCenter/redux/Icon/icon.saga'
import flowsSaga from '../modules/eOrderControlCenter/redux/Flow/flow.saga'
import layoutsSaga from '../modules/eOrderControlCenter/redux/Layout/layout.saga'
import workOrdersSaga from '../modules/eOrderControlCenter/redux/WorkOrder/workorder.saga'
import workorderPropertiesSaga from '../modules/eOrderControlCenter/redux/WorkOrderProperty/workOrderProperty.saga'

import sourceListSaga from '../modules/eOrderControlCenter/routes/Sources/redux/sourceList.saga'
import businessUnitListSaga from '../modules/eOrderControlCenter/routes/BusinessUnits/redux/businessUnitList.saga'
import operationListSaga from '../modules/eOrderControlCenter/routes/Operations/redux/operationList.saga'
import iconListSaga from '../modules/eOrderControlCenter/routes/Icons/redux/iconList.saga'

function * runSagas () {
  yield all([
    fork(configurationData),
    fork(teamsSaga),
    fork(teamsOperatorsSaga),
    fork(usersSaga),
    fork(sourcesSaga),
    fork(operationsSaga),
    fork(businessUnitsSaga),
    fork(iconsSaga),
    fork(flowsSaga),
    fork(layoutsSaga),
    fork(workOrdersSaga),
    fork(workorderPropertiesSaga),

    fork(sourceListSaga),
    fork(businessUnitListSaga),
    fork(operationListSaga),
    fork(iconListSaga)
  ])
}

export default runSagas
