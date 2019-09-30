import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'

import GridSelect from '~/components/GridSelect'

const styles = () => ({
  root: {
    minWidth: 180,
    paddingRight: 8
  }
})

class GridSelectCell extends React.Component {
  handleChange = value => {
    const { onChange } = this.props
    onChange({ target: { value: value.toString() } })
  }

  render () {
    const {
      classes,
      suggestions,
      field,
      value,
      placeholder
    } = this.props

    const val = value.length ? { label: value, value } : null

    return (
      <TableCell className={classes.root}>
        <GridSelect
          value={val}
          suggestions={suggestions.map(s => ({
            label: s[field],
            value: s[field]
          }))}
          placeholder={placeholder}
          onChange={this.handleChange}/>
      </TableCell>
    )
  }
}

GridSelectCell.propTypes = {
  classes: PropTypes.object,
  suggestions: PropTypes.array,
  field: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default withStyles(styles)(GridSelectCell)
