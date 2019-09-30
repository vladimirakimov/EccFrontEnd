import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import withStyles from '@material-ui/core/styles/withStyles'

import SideNav from '~/components/SideNav'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: '100vh'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    zIndex: 'auto'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0
  },
  toolbar: theme.mixins.toolbar
})

class Layout extends React.Component {
  render () {
    const {
      classes,
      title,
      isSidebarCollapsed,
      toggleSidebar,
      children
    } = this.props

    return (
      <div className={classes.root}>
        <Drawer
          variant='permanent'
          open={isSidebarCollapsed}
          classes={{
            paper: classNames(classes.drawerPaper, isSidebarCollapsed && classes.drawerPaperClose)
          }}>
          <SideNav
            title={title}
            onLogoClicked={toggleSidebar}/>
        </Drawer>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.string,
  isSidebarCollapsed: PropTypes.bool,
  toggleSidebar: PropTypes.func
}

export default withStyles(styles)(Layout)
