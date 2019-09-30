import * as Msal from 'msal'

import store from '../redux/config'
import { config } from './config'
import { ACTIONS } from '../modules/user/redux/user.actions'

class MSALAuth {
  constructor () {
    this.instance = new Msal.UserAgentApplication(config.clientID, config.authority, this.handleAuth, config.options)
  }

  handleauth (errorDesc, token, error, tokenType) {
    if (errorDesc) {
      console.log(errorDesc)
    } else {
      this.authenticate(token)
    }
  }

  checkAuthToken () {
    return new Promise((resolve) => {
      const user = this.instance.getUser()

      if (user) {
        this.instance.acquireTokenSilent(config.scopes, null)
          .then((token) => {
            this.authenticate(token)
            resolve()
          }, () => {
            resolve()
            this.instance.acquireTokenRedirect(config.scopes)
          })
      } else {
        resolve()
      }
    })
  }

  loginRedirect () {
    this.instance.loginRedirect(config.scopes)
  }

  authenticate (token) {
    store.dispatch(ACTIONS.updateUser({
      token
    }))
  }
}

export default new MSALAuth()
