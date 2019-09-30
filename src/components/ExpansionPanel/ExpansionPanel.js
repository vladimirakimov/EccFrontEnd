import React from 'react'
import PropTypes from 'prop-types'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  entered: {
    height: 'auto',
    overflow: 'visible'
  }
})

const ExpansionPanel = ({ classes, children, ...restProps }) =>
  <MuiExpansionPanel
    CollapseProps={{
      classes: {
        entered: classes.entered
      }
    }}
    {...restProps}
  >
    {children}
  </MuiExpansionPanel >

ExpansionPanel.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node
}

export default withStyles(styles)(ExpansionPanel)
