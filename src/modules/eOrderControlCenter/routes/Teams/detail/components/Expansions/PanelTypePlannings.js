import React from 'react'
import PropTypes from 'prop-types'
import FilterNoneIcon from '@material-ui/icons/FilterNone'

import ExpansionPanelNew from '~/components/ExpansionPanelNew'

class PanelTypePlannings extends React.PureComponent {
  render () {
    const {
      typePlannings,
      selectedTypePlannings,
      onChange
    } = this.props

    return (
      <ExpansionPanelNew
        icon={<FilterNoneIcon />}
        title="Type Plannings"
        items={typePlannings}
        selectedItems={selectedTypePlannings}
        onChange={onChange} />
    )
  }
}

PanelTypePlannings.propTypes = {
  typePlannings: PropTypes.any,
  selectedTypePlannings: PropTypes.any,
  onChange: PropTypes.func
}

export default PanelTypePlannings
