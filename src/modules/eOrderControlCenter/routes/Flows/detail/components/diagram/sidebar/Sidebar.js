import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 290

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    maxHeight: 'calc(100vh - 210px)',
    overflow: 'auto',
    zIndex: 0
  }
})

class TrayWidget extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.drawerPaper}>
        {this.props.children}
      </div>
    )
  }
}

TrayWidget.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.array
}

export default withStyles(styles)(TrayWidget)
