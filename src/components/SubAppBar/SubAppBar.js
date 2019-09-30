import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer - 1
  },
  flex: {
    flex: 1
  },
  toolbar: theme.mixins.toolbar
})

const SubAppBar = ({ classes, title, toolbarChildren, children }) =>
  <React.Fragment>
    <AppBar position='absolute' color='default' className={classes.appBar}>
      <Toolbar>
        <Typography variant='headline' color='inherit' className={classes.flex}>{title}</Typography>
        {toolbarChildren}
      </Toolbar>
      {children}
    </AppBar>
    <div className={classes.toolbar} />
  </React.Fragment>

SubAppBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  toolbarChildren: PropTypes.node,
  children: PropTypes.node
}

export default withStyles(styles)(SubAppBar)
