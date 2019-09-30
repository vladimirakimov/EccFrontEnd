import * as Msal from 'msal'
import { BASE_URL } from '../config'

// Logger has other optional parameters like piiLoggingEnabled which can be assigned as shown aabove. Please refer to the docs to see the full list and their default values.
const logger = new Msal.Logger(loggerCallback, { level: Msal.LogLevel.Verbose, correlationId: '12345' }) // level and correlationId are optional parameters.

// logger and cacheLocation are optional parameters.
// userAgentApplication has other optional parameters like redirectUri which can be assigned as shown above.Please refer to the docs to see the full list and their default values.
// var userAgentApplication = new Msal.UserAgentApplication(config.clientID, config.authority, authCallback, config.options)

function loggerCallback (logLevel, message, piiLoggingEnabled) {
  console.log(message)
}

export const config = {
  clientID: '622dabc4-3841-4a61-ac88-1d4cfb4cc329',
  authority: 'https://login.microsoftonline.com/katoennatie.onmicrosoft.com/',
  scopes: ['user.read'],
  options: {
    logger,
    cacheLocation: 'localStorage',
    redirectUri: BASE_URL
  }
}
