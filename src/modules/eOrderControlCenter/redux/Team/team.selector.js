import {
  getFilteredCustomers,
  getFilteredSites,
  getFilteredOperationalDepartments,
  getFilteredTypePlannings,
  getFilteredProductionSites,
  getFilteredTransportTypes
} from '../ConfigurationData/configurationData.selector'

export const getTeams = state => state.data.teams.data ? state.data.teams.data : []
export const getTeam = state => state.data.teams.selectedTeam

export const getFilteredCustomersForTeam = state => {
  const team = getTeam(state)
  return getFilteredCustomers(state, team && team.sources)
}

export const getFilteredSitesForTeam = state => {
  const team = getTeam(state)
  return getFilteredSites(state, team && team.sites, team && team.sources)
}

export const getFilteredOperationalDepartmentsForTeam = state => {
  const team = getTeam(state)
  return getFilteredOperationalDepartments(state, team && team.sites)
}

export const getFilteredTypePlanningsForTeam = state => {
  const team = getTeam(state)
  return getFilteredTypePlannings(state, team && team.typePlannings, team && team.sources)
}

export const getFilteredProductionSitesForTeam = state => {
  const team = getTeam(state)
  return getFilteredProductionSites(state, team && team.productionSites, team && team.sources)
}

export const getFilteredTransportTypesForTeam = state => {
  const team = getTeam(state)
  return getFilteredTransportTypes(state, team && team.transportTypes, team && team.sources)
}
