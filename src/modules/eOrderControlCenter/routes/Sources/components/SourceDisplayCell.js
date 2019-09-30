import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  chip: {
    '&:not(:last-child)': {
      marginRight: 8
    }
  }
})

class SourceDisplayCell extends React.Component {
  render () {
    const { classes, value } = this.props

    let businessUnits = null
    if (value.length) {
      businessUnits = value.map((businessUnit, i) =>
        <Chip className={classes.chip} key={i} label={businessUnit} />)
    }

    return (<TableCell>{businessUnits}</TableCell>)
  }
}

SourceDisplayCell.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.any
}

export default withStyles(styles)(SourceDisplayCell)
