export const getSources = (state) => state.data.sources.data && state.data.sources.data.length > 0 ? state.data.sources.data : []
export const getSource = (state) => state.data.sources.selectedSource ? state.data.sources.selectedSource : {}
