export const getAppIsLoading = (state) => {
  let found = false
  for (let key in state.data) {
    if (state.data[key].isLoading) {
      found = true
    }
  }
  return found
}
