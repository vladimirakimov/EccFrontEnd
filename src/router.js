import store from './redux/config'
import { isAuthenticated } from './modules/user/redux/user.selectors'

const authenticated = isAuthenticated(store.getState())

if (context.route.protected && !authenticated) {
  return { unauthenticated: true }
}
