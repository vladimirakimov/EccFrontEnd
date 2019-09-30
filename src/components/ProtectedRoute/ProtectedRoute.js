import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import MSALAuth from '../../msal'

class ProtectedRoute extends React.Component {
  render () {
    const { component: Component, ...rest } = this.props
    const authenticated = true // isAuthenticated(store.getState())

    return (
      <div>
        <Route exact {...rest} render={(props) => {
          if (authenticated === true) {
            return <Component {...props} />
          }

          MSALAuth.loginRedirect()

          return null
        }} />
      </div>
    )
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.func
}

export default ProtectedRoute
