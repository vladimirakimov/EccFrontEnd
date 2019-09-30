import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES } from '~/modules/eOrderControlCenter/routes/config'
import { generateRoute } from '~/utils/routeGenerator'
import { TYPES, ACTIONS } from './team.actions'
import { TeamApi as Api } from '../../api/eOrderControlCenterApi'

function * teamsSaga () {
  yield takeLatest(TYPES.GET_LIST, getList)
  yield takeLatest(TYPES.GET_BY_ID, getById)
  yield takeLatest(TYPES.CREATE, create)
  yield takeLatest(TYPES.UPDATE, update)
  yield takeLatest(TYPES.DELETE, _delete)
}

function * getList (action) {
  try {
    const response = yield call(Api.getList, action.payload.page, action.payload.pageSize)
    yield put(ACTIONS.getListSuccess(response.value))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.getListFail(err))
  }
}

function * getById (action) {
  try {
    const team = yield call(Api.getById, action.payload.id)

    let transformedTeam = {}

    if (team.filterContent) {
      team.filterContent = JSON.parse(team.filterContent)

      const { id, name, description, image, layout, driverWait, teamOperators } = team
      const { sources, sites, operations, operationalDepartments, typePlannings, customers, productionSites, transportTypes } = team.filterContent
      transformedTeam = {
        id,
        name,
        description,
        image,
        layout,
        teamOperators,
        sources,
        sites,
        operations,
        operationalDepartments,
        typePlannings,
        customers,
        productionSites,
        transportTypes,
        driverWait
      }
    } else {
      transformedTeam = team
    }

    yield put(ACTIONS.getByIdSuccess(transformedTeam))
  } catch (err) {
    yield put(ACTIONS.getByIdFail(err))
  }
}

function * create (action) {
  try {
    const payload = action.payload.value
    yield call(Api.create, payload)

    const id = window.localStorage.getItem('createdID')
    const newTeam = { ...payload, id }

    yield put(ACTIONS.createSuccess(newTeam))
    yield put(push(generateRoute(ROUTES.TEAMDETAIL, { id })))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.createFail(err))
  }
}

function * update (action) {
  try {
    // When backend will be ready
    // const transformedPayload = transformPayload(action.payload.value)

    const updatedTeam = action.payload.value
    const {
      id,
      name,
      description,
      image,
      layout,
      teamOperators,
      sources,
      sites,
      operations,
      operationalDepartments,
      typePlannings,
      customers,
      productionSites,
      transportTypes,
      driverWait
    } = updatedTeam

    const transformedPayload = {
      id,
      name,
      description,
      image,
      layout,
      driverWait,
      teamOperators: teamOperators.map(teamOperator => teamOperator.id),
      filterContent: JSON.stringify({
        sources,
        sites,
        operations,
        operationalDepartments,
        typePlannings,
        customers,
        productionSites,
        transportTypes
      })
    }
    yield call(Api.update, transformedPayload)
    yield put(ACTIONS.updateSuccess())
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
    yield put(push(generateRoute(ROUTES.TEAMS)))
  } catch (err) {
    console.log(err)
    yield put(ACTIONS.deleteFail(err))
  }
}

// When backend will be ready
//
// function transformPayload (payload) {
//   return {
//     ...payload,
//     sources: payload.sources.map(x => x.value),
//     sites: payload.sites.map(x => x.value),
//     operations: payload.operations.map(x => x.value),
//     operationalDepartments: payload.operationalDepartments.map(x => x.value),
//     typePlannings: payload.typePlannings.map(x => x.value),
//     customers: payload.customers.map(x => x.value),
//     productionSites: payload.productionSites.map(x => x.value),
//     transportTypes: payload.transportTypes.map(x => x.value),
//     teamOperators: payload.teamOperators.map(x => x.id)
//   }
// }

export default teamsSaga
