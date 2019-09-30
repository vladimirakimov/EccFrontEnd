import { TYPES } from './sync.actions'
import { ACTIONS as SOURCE_ACTIONS } from '../../../modules/eOrderControlCenter/redux/Source/source.actions'
import { ACTIONS as OPERATION_ACTIONS } from '../../../modules/eOrderControlCenter/redux/Operation/operation.actions'
import { ACTIONS as CONFIGURATIONDATA_ACTIONS } from '../../../modules/eOrderControlCenter/redux/ConfigurationData/configurationData.actions'
import { ACTIONS as ICON_ACTIONS } from '../../../modules/eOrderControlCenter/redux/Icon/icon.actions'
import { ACTIONS as USER_ACTIONS } from '../../../modules/eOrderControlCenter/redux/User/user.actions'
import { ACTIONS as WORKORDERPROPERTY_ACTIONS } from '../../../modules/eOrderControlCenter/redux/WorkOrderProperty/workOrderProperty.actions'

export const syncStaticAppData = store => next => action => {
  switch (action.type) {
    case TYPES.GET_STATIC_APP_DATA:
      store.dispatch(CONFIGURATIONDATA_ACTIONS.get())
      store.dispatch(WORKORDERPROPERTY_ACTIONS.get())
      store.dispatch(SOURCE_ACTIONS.getListSources())
      // store.dispatch(OPERATION_ACTIONS.getList())
      store.dispatch(ICON_ACTIONS.getList())
      store.dispatch(USER_ACTIONS.getList())
      break
  }
  next(action)
}
