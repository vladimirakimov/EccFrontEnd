export const getBusinessUnits = state => state.data.businessUnits.data && state.data.businessUnits.data.length > 0 ? state.data.businessUnits.data : []
export const getBusinessUnit = (state) => state.data.businessUnits.selectedBusinessUnit ? state.data.businessUnits.selectedBusinessUnit : {}
