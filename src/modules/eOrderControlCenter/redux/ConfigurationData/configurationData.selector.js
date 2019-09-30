export const getConfigurationData = (state) => {
  return state.data.configurationData.data && state.data.configurationData.data.length > 0 ? state.data.configurationData.data : {}
}

export const getCustomers = state => state.data.configurationData.data.customers
export const getSites = state => state.data.configurationData.data.sites
export const getTypePlannings = state => state.data.configurationData.data.typePlannings
export const getProductionSites = state => state.data.configurationData.data.productionSites
export const getTransportTypes = state => state.data.configurationData.data.transportTypes

export const getFilteredCustomers = (state, sources) => {
  const customers = getCustomers(state)

  return (sources && customers && customers.filter(x => sources.map(x => x.name).indexOf(x.source) > -1)) || []
}

export const getFilteredSites = (state, sites, sources) => {
  const allSites = getSites(state)
  const filteredSites = (sources && allSites && allSites.filter(x => sources.map(x => x.name).indexOf(x.source) > -1)) || []

  return [...filteredSites]
}

export const getFilteredOperationalDepartments = (state, sites) => {
  const operationalDepartments = (sites && sites.map(x => x.operationalDepartments)) || []

  return [].concat.apply([], operationalDepartments)
}

export const getFilteredTypePlannings = (state, typePlannings, sources) => {
  const allTypePlannings = getTypePlannings(state)
  const entityTypePlannings = (typePlannings && allTypePlannings && allTypePlannings.filter(x => typePlannings.map(x => x.value).indexOf(x.name) > -1)) || []
  const filteredTypePlannings = (sources && allTypePlannings && allTypePlannings.filter(x => sources.map(x => x.value).indexOf(x.source) > -1)) || []

  return [
    ...new Set([
      ...entityTypePlannings,
      ...filteredTypePlannings
    ])
  ]
}

export const getFilteredProductionSites = (state, productionSites, sources) => {
  const allProductionSites = getProductionSites(state)
  const entityProductionSites = (productionSites && allProductionSites && allProductionSites.filter(x => productionSites.map(x => x.value).indexOf(x.name) > -1)) || []
  const filteredProductionSites = (sources && allProductionSites && allProductionSites.filter(x => sources.map(x => x.name).indexOf(x.source) > -1)) || []

  return [
    ...new Set([
      ...entityProductionSites,
      ...filteredProductionSites
    ])
  ]
}

export const getFilteredTransportTypes = (state, transportTypes, sources) => {
  const allTransportTypes = getTransportTypes(state)
  const entityTransportTypes = (transportTypes && allTransportTypes && allTransportTypes.filter(x => transportTypes.map(x => x.value).indexOf(x.name) > -1)) || []
  const filteredTransportTypes = (sources && allTransportTypes && allTransportTypes.filter(x => sources.map(x => x.name).indexOf(x.source) > -1)) || []

  return [
    ...new Set([
      ...entityTransportTypes,
      ...filteredTransportTypes
    ])
  ]
}
