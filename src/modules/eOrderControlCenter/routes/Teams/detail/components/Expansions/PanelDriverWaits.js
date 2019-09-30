import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(18)
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    flexBasis: '100%'
  },
  icon: {
    marginRight: 16
  }
})

class PanelTransportTypes extends React.PureComponent {
  render () {
    const {
      classes,
      selectedDriverWait,
      onChange
    } = this.props

    const radios = ['Yes', 'No', 'Unspecified'].map((value, i) =>
      <FormControlLabel
        key={i}
        value={value}
        control={<Radio color="primary" />}
        label={value}
        labelPlacement="end" />
    )

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <span className={classes.icon}>
              <DepartureBoardIcon />
            </span>
            <div>
              <Typography className={classes.heading}>Driver Waits</Typography>
              <Typography variant="caption">
                Selected option: <b>{selectedDriverWait}</b>
              </Typography>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RadioGroup
            aria-label="driverWaitsFilter"
            name="driverWaitsFilter"
            value={selectedDriverWait}
            onChange={(e, value) => onChange(value)}
            row>
            { radios }
          </RadioGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

PanelTransportTypes.propTypes = {
  classes: PropTypes.object,
  selectedDriverWait: PropTypes.any,
  onChange: PropTypes.func
}

export default withStyles(styles)(PanelTransportTypes)
