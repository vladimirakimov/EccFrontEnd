export const getUsers = state => state.data.users.data || []
export const getUser = state => state.data.users.selectedUser || {}
export const getUsersErrors = state => state.data.users.errors
export const userCreateModal = state => state.data.users.createModal
