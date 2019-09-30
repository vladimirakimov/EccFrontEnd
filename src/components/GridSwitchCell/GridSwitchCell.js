import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  centeredText: {
    textAlign: 'center'
  }
})

class GridSwitchCell extends React.Component {
  handleChange = checked => {
    const { onChange } = this.props
    onChange({ target: { value: checked } })
  }

  render () {
    const { classes, value } = this.props

    return (
      <TableCell className={classes.centeredText}>
        <Switch
          checked={value}
          onChange={(e, checked) => this.handleChange(checked)}
          color="primary" />
      </TableCell>
    )
  }
}

GridSwitchCell.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default withStyles(styles)(GridSwitchCell)
