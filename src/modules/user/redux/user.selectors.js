export const getUser = (state) => state.app.user
export const isAuthenticated = (state) => state.app.user.token && Boolean(state.app.user.token)
