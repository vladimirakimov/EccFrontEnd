export const getLoggerMessage = (state) => {
  return state.app.logger && state.app.logger.message ? state.app.logger.message : false
}

export const getLoggerType = (state) => {
  return state.app.logger && state.app.logger.type ? state.app.logger.type : false
}
