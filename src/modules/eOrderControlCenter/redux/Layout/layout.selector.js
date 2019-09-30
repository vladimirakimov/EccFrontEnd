export const getLayouts = state => state.data.layouts.data ? state.data.layouts.data : []
export const getLayout = state => state.data.layouts.selectedLayout || {}
export const getLayoutsErrors = state => state.data.layouts.errors
export const layoutCreateModal = state => state.data.layouts.createModal
