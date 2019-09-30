import React, { Component } from 'react'
import { Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import routes from '~/routes'
import ProtectedRoute from '~/components/ProtectedRoute'
import Layout from '~/components/Layout/Layout'
import Toast from '~/components/Toast/Toast'
import ProgressOverlay from '~/components/ProgressOverlay/ProgressOverlay'
import { ROUTES } from '~/modules/eOrderControlCenter/routes/config'
import { getLoggerMessage, getLoggerType } from './redux/logger.selector'
import { ACTIONS as LOGGER_ACTIONS } from './redux/logger.actions'
import { ACTIONS as SYNC_ACTIONS } from './redux/sync.actions'
import { ACTIONS as UI_ACTIONS } from './redux/ui.actions'
import { getAppIsLoading } from './redux/app.selector'
import { getTitle, isDarkThemeSelected, isSidebarCollapsed } from './redux/ui.selector.js'
import { lightTheme, darkTheme } from '~/css/config'

class App extends Component {
  componentDidMount () {
    const { getStaticAppData } = this.props
    getStaticAppData()
  }
  handleLoggerClose () {
    const { loggerClose } = this.props
    loggerClose()
  }

  render () {
    const {
      isLoading,
      isDarkThemeSelected,
      isSidebarCollapsed,
      title,
      message,
      type,
      toggleSidebar
    } = this.props

    return (
      <React.Fragment>
        <MuiThemeProvider theme={isDarkThemeSelected ? darkTheme : lightTheme}>
          <Layout
            isSidebarCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
            title={title}>

            <ProgressOverlay show={isLoading}>
              <Switch>
                {routes.map((route, i) => {
                  const Component = route.component
                  return (
                    <ProtectedRoute key={i} path={route.path} component={Component} />
                  )
                })}
                <Redirect to={`${ROUTES.ORDER_OVERVIEW}`} />
              </Switch>
            </ProgressOverlay>

            <Toast
              message={message}
              type={type}
              open={!!message}
              onClose={this.handleLoggerClose.bind(this)} />
          </Layout>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  isDarkThemeSelected: PropTypes.bool,
  isSidebarCollapsed: PropTypes.bool,
  title: PropTypes.node,
  message: PropTypes.node,
  type: PropTypes.node,
  loggerClose: PropTypes.func,
  getStaticAppData: PropTypes.func,
  toggleSidebar: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    isLoading: getAppIsLoading(state),
    isDarkThemeSelected: isDarkThemeSelected(state),
    isSidebarCollapsed: isSidebarCollapsed(state),
    title: getTitle(state),
    message: getLoggerMessage(state),
    type: getLoggerType(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggerClose: () => dispatch(LOGGER_ACTIONS.loggerClose()),
    getStaticAppData: () => dispatch(SYNC_ACTIONS.getStaticAppData()),
    toggleSidebar: () => dispatch(UI_ACTIONS.toggleSidebar())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
