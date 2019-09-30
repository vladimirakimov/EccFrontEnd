import { TYPES } from './flow.actions'

const INITIAL_STATE = {
  data: null,
  selectedFlow: null,
  error: false,
  errors: [],
  createModal: false,
  isLoading: false
}

const flowsReducer = (state = INITIAL_STATE, action) => {
  if (!action.type || !action.payload) {
    return state
  }

  switch (action.type) {
    case TYPES.GET_LIST:
      return { ...state, isLoading: true }

    case TYPES.GET_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload.data.value,
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
        selectedFlow: null,
        isLoading: true
      }

    case TYPES.GET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedFlow: action.payload.data,
        isLoading: false
      }

    case TYPES.GET_BY_ID_FAIL:
      return {
        ...state,
        selectedFlow: null,
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
        error: true,
        errors: action.payload.err.response.data.error.details,
        isLoading: false
      }

    case TYPES.UPDATE_SUCCESS:
      return {
        ...state,
        selectedLayout: action.payload.data
      }

    case TYPES.DELETE_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(flow => flow.id !== action.payload.id)]
      }

    case TYPES.CHANGE_SOURCES:
      return {
        ...state,
        selectedFlow: {
          ...state.selectedFlow,
          sources: action.payload.sources
        }
      }

    case TYPES.CHANGE_SITES:
      return {
        ...state,
        selectedFlow: {
          ...state.selectedFlow,
          sites: action.payload.sites
        }
      }

    case TYPES.CHANGE_OPERATIONS:
      return {
        ...state,
        selectedFlow: {
          ...state.selectedFlow,
          operations: action.payload.operations
        }
      }

    case TYPES.CHANGE_OPERATIONAL_DEPARTMENTS:
      return {
        ...state,
        selectedFlow: {
          ...state.selectedFlow,
          operationalDepartments: action.payload.operationalDepartments
        }
      }

    case TYPES.CHANGE_TYPE_PLANNINGS:
      return {
        ...state,
        selectedFlow: {
          ...state.selectedFlow,
          typePlannings: action.payload.typePlannings
        }
      }

    case TYPES.CHANGE_CUSTOMERS:
      return {
        ...state,
        selectedFlow: {
          ...state.selectedFlow,
          customers: action.payload.customers
        }
      }

    case TYPES.CHANGE_PRODUCTION_SITES:
      return {
        ...state,
        selectedFlow: {
          ...state.selectedFlow,
          productionSites: action.payload.productionSites
        }
      }

    case TYPES.CHANGE_TRANSPORT_TYPES:
      return {
        ...state,
        selectedFlow: {
          ...state.selectedFlow,
          transportTypes: action.payload.transportTypes
        }
      }

    case TYPES.SHOW_CREATE_DIALOG:
      return {
        ...state,
        createModal: true
      }

    case TYPES.HIDE_CREATE_DIALOG:
      return {
        ...state,
        errors: [],
        createModal: false
      }

    default:
      return state
  }
}

export default flowsReducer
