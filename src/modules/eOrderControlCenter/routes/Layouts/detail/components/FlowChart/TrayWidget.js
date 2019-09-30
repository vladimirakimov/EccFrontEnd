import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 200

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    zIndex: 0
  }
})

class TrayWidget extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <Drawer variant='permanent' classes={{
        paper: classes.drawerPaper
      }}>
        <List component='nav'>
          {this.props.children}
        </List>
      </Drawer>
    )
  }
}

TrayWidget.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.array
}

export default withStyles(styles)(TrayWidget)
