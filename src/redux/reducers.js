import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from '../modules/user/redux/user.reducer'
import configurationData from '../modules/eOrderControlCenter/redux/ConfigurationData/configurationData.reducer'
import teams from '../modules/eOrderControlCenter/redux/Team/team.reducer'
import teamsOperators from '../modules/eOrderControlCenter/redux/TeamOperator/teamOperator.reducer'
import users from '../modules/eOrderControlCenter/redux/User/user.reducer'
import sources from '../modules/eOrderControlCenter/redux/Source/source.reducer'
import operations from '../modules/eOrderControlCenter/redux/Operation/operation.reducer'
import businessUnits from '../modules/eOrderControlCenter/redux/BusinessUnit/businessUnit.reducer'
import icons from '../modules/eOrderControlCenter/redux/Icon/icon.reducer'
import flows from '../modules/eOrderControlCenter/redux/Flow/flow.reducer'
import layouts from '../modules/eOrderControlCenter/redux/Layout/layout.reducer'
import workOrders from '../modules/eOrderControlCenter/redux/WorkOrder/workorder.reducer'
import workOrderProperties from '../modules/eOrderControlCenter/redux/WorkOrderProperty/workOrderProperty.reducer'

import sourcesList from '../modules/eOrderControlCenter/routes/Sources/redux/sourceList.reducer'
import businessUnitList from '../modules/eOrderControlCenter/routes/BusinessUnits/redux/businessUnitList.reducer'
import operationList from '../modules/eOrderControlCenter/routes/Operations/redux/operationList.reducer'
import iconList from '../modules/eOrderControlCenter/routes/Icons/redux/iconList.reducer'
import flowDetail from '../modules/eOrderControlCenter/routes/Flows/detail/redux/flowDetail.reducer'
import layoutDetail from '../modules/eOrderControlCenter/routes/Layouts/detail/redux/layoutDetail.reducer'
import layoutButtonFiltersList from '../modules/eOrderControlCenter/routes/Layouts/detail/redux/buttonPortFiltersList.reducer'
import layoutTabWorkOrderButtonsList from '../modules/eOrderControlCenter/routes/Layouts/detail/redux/tabWorkOrderButtonsList.reducer'
import teamDetail from '../modules/eOrderControlCenter/routes/Teams/detail/redux/teamDetail.reducer'
import userList from '../modules/eOrderControlCenter/routes/Users/redux/userList.reducer'
import workOrderList from '../modules/eOrderControlCenter/routes/WorkOrders/list/redux/workOrderList.reducer'

import logger from '../containers/App/redux/logger.reducer'
import ui from '../containers/App/redux/ui.reducer'

export default combineReducers({
  data: combineReducers({
    configurationData,
    teams,
    teamsOperators,
    users,
    sources,
    operations,
    businessUnits,
    icons,
    flows,
    layouts,
    workOrders,
    workOrderProperties
  }),
  pages: combineReducers({
    teams: combineReducers({
      teamDetail
    }),
    sources: sourcesList,
    businessUnits: businessUnitList,
    operations: operationList,
    icons: iconList,
    users: userList,
    flows: combineReducers({
      flowDetail
    }),
    layouts: combineReducers({
      layoutDetail,
      layoutButtonFiltersList,
      layoutTabWorkOrderButtonsList
    }),
    workOrders: workOrderList
  }),
  app: combineReducers({
    user,
    logger,
    ui
  }),
  router: routerReducer
})
