import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'

import GridSelect from '~/components/GridSelect'

class SourceEditCell extends React.Component {
  handleChange = values => {
    const { onChange } = this.props
    onChange({ target: { value: values } })
  }

  render () {
    const { businessUnits, value } = this.props

    let values = null
    if (value) {
      values = value.map(bu => ({
        label: bu,
        value: bu
      }))
    }

    return (
      <TableCell>
        <GridSelect
          value={values}
          suggestions={businessUnits.map(bu => ({
            label: bu.name,
            value: bu.name
          }))}
          placeholder={'Select business units'}
          onChange={this.handleChange}
          isMulti/>
      </TableCell>
    )
  }
}

SourceEditCell.propTypes = {
  classes: PropTypes.object,
  businessUnits: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default SourceEditCell
