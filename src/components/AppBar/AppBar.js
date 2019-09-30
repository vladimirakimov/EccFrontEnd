import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Close from '@material-ui/icons/Close'

import { ACTIONS as UI_ACTIONS } from '../../containers/App/redux/ui.actions'
import { isDarkThemeSelected } from '../../containers/App/redux/ui.selector.js'
import AppBarSearch from '../AppBarSearch/AppBarSearch'
import AppBarUser from '../AppBarUser/AppBarUser'
import AppBarSettings from '../AppBarSettings/AppBarSettings'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer - 1,
    background: theme.palette.default.main,
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  flex: {
    flex: 1
  },
  toolbar: theme.mixins.toolbar
})

class TopBar extends React.PureComponent {
  render () {
    const {
      classes,
      title,
      canGoBack,
      canClose,
      onClose,
      onSearchChange,
      isSearchBarAvailable,
      goToPreviousPage,
      isDarkThemeSelected,
      toggleTheme
    } = this.props

    return (
      <React.Fragment>
        <AppBar position='absolute' color='default' className={classes.appBar}>
          <Toolbar>
            {(!canClose && canGoBack) &&
              <IconButton onClick={goToPreviousPage} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <ArrowBack />
              </IconButton>
            }

            <Typography variant='h5' color='inherit' className={classes.flex}>
              {title}
            </Typography>

            {isSearchBarAvailable &&
              <AppBarSearch onChange={onSearchChange} />
            }

            {!canClose
              ? <React.Fragment>
                <AppBarUser isDarkThemeSelected={isDarkThemeSelected} toggleTheme={toggleTheme} />
                <AppBarSettings />
              </React.Fragment>
              : <IconButton onClick={onClose} color="inherit" aria-label="Close button configuration">
                <Close />
              </IconButton>
            }
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

TopBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  isSearchBarAvailable: PropTypes.bool,
  onSearchChange: PropTypes.func,
  canGoBack: PropTypes.bool,
  canClose: PropTypes.bool,
  goToPreviousPage: PropTypes.func,
  onClose: PropTypes.func,
  isDarkThemeSelected: PropTypes.bool,
  toggleTheme: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    isDarkThemeSelected: isDarkThemeSelected(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleTheme: () => { dispatch(UI_ACTIONS.toggleTheme()) }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TopBar))
