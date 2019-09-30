import { TYPES } from './team.actions'

const DEFAULT_STATE = {
  data: null,
  error: false,
  isLoading: false,
  selectedTeam: null
}

const teamsReducer = (state = DEFAULT_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.GET_LIST:
      return { ...state, isLoading: true }

    case TYPES.GET_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      }

    case TYPES.GET_LIST_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    case TYPES.GET_BY_ID:
      return {
        ...state,
        selectedTeam: null,
        isLoading: true
      }

    case TYPES.GET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedTeam: action.payload.data,
        isLoading: false
      }

    case TYPES.GET_BY_ID_FAIL:
      return {
        ...state,
        selectedTeam: null,
        isLoading: false
      }

    case TYPES.CREATE:
      return {
        ...state,
        isLoading: true
      }

    case TYPES.CREATE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.data
        ],
        isLoading: false
      }

    case TYPES.CREATE_FAIL:
      return {
        ...state,
        isLoading: false
      }

    case TYPES.DELETE:
      return {
        ...state,
        isLoading: true
      }

    case TYPES.DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(t => action.payload.id.indexOf(t.id) < 0),
        isLoading: false
      }

    case TYPES.DELETE_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false
      }

    case TYPES.CHANGE_SOURCES:
      const sources = action.payload.sources.length
      let emptyData

      if (!sources) {
        emptyData = {
          sites: [],
          operationalDepartments: [],
          typePlannings: [],
          customers: [],
          productionSites: [],
          transportTypes: []
        }
      }

      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          sources: action.payload.sources,
          ...emptyData
        }
      }

    case TYPES.CHANGE_SITES:
      const emptySites = action.payload.sites.length
      let emptySitesData

      if (!emptySites) emptySitesData = { operationalDepartments: [] }

      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          sites: action.payload.sites,
          ...emptySitesData
        }
      }

    case TYPES.CHANGE_OPERATIONS:
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          operations: action.payload.operations
        }
      }

    case TYPES.CHANGE_OPERATIONAL_DEPARTMENTS:
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          operationalDepartments: action.payload.operationalDepartments
        }
      }

    case TYPES.CHANGE_TYPE_PLANNINGS:
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          typePlannings: action.payload.typePlannings
        }
      }

    case TYPES.CHANGE_CUSTOMERS:
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          customers: action.payload.customers
        }
      }

    case TYPES.CHANGE_PRODUCTION_SITES:
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          productionSites: action.payload.productionSites
        }
      }

    case TYPES.CHANGE_TRANSPORT_TYPES:
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          transportTypes: action.payload.transportTypes
        }
      }

    case TYPES.CHANGE_DRIVER_WAIT:
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          driverWait: action.payload.driverWait
        }
      }

    default:
      return state
  }
}

export default teamsReducer
