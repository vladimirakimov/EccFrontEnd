export const getIcons = (state) => {
  return state.data.icons.data && state.data.icons.data.length > 0 ? state.data.icons.data : []
}
