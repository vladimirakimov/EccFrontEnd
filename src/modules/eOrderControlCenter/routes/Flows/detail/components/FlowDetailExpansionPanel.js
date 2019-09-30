import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ExpansionPanel from '~/components/ExpansionPanel/ExpansionPanel'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  panelDetails: {
    display: 'block'
  }
})

const FlowDetailExpansionPanel = ({ classes, title, children }) =>
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.heading}>{title}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
      {children}
    </ExpansionPanelDetails>
  </ExpansionPanel>

FlowDetailExpansionPanel.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.any
}

export default withStyles(styles)(FlowDetailExpansionPanel)
