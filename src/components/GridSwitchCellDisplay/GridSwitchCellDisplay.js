import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'

const styles = () => ({
  centeredText: {
    textAlign: 'center'
  }
})

const GridSwitchCellDisplay = ({ classes, value }) =>
  <TableCell className={classes.centeredText}>
    {value && <CheckIcon color="primary" />}
  </TableCell>

GridSwitchCellDisplay.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.any
}

export default withStyles(styles)(GridSwitchCellDisplay)
