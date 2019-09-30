import {
  getFilteredCustomers,
  getFilteredSites,
  getFilteredOperationalDepartments,
  getFilteredTypePlannings,
  getFilteredProductionSites,
  getFilteredTransportTypes
} from '../ConfigurationData/configurationData.selector'

export const getFlows = state => state.data.flows.data || []
export const getFlow = state => state.data.flows.selectedFlow || {}
export const getFlowsErrors = state => state.data.flows.errors
export const flowCreateModal = state => state.data.flows.createModal

export const getFilteredCustomersForFlow = state => {
  const flow = getFlow(state)
  return getFilteredCustomers(state, flow && flow.sources)
}

export const getFilteredSitesForFlow = state => {
  const flow = getFlow(state)
  return getFilteredSites(state, flow && flow.sites, flow && flow.sources)
}

export const getFilteredOperationalDepartmentsForFlow = state => {
  const sites = getFilteredSitesForFlow(state)
  return getFilteredOperationalDepartments(state, sites)
}

export const getFilteredTypePlanningsForFlow = state => {
  const flow = getFlow(state)
  return getFilteredTypePlannings(state, flow && flow.typePlannings, flow && flow.sources)
}

export const getFilteredProductionSitesForFlow = state => {
  const flow = getFlow(state)
  return getFilteredProductionSites(state, flow && flow.productionSites, flow && flow.sources)
}

export const getFilteredTransportTypesForFlow = state => {
  const flow = getFlow(state)
  return getFilteredTransportTypes(state, flow && flow.transportTypes, flow && flow.sources)
}
