import React from 'react'
import PropTypes from 'prop-types'
import GroupIcon from '@material-ui/icons/Group'

import ExpansionPanelNew from '~/components/ExpansionPanelNew'

class PanelOperationalDepartments extends React.PureComponent {
  render () {
    const {
      operationalDepartments,
      selectedOperationalDepartments,
      onChange
    } = this.props

    return (
      <ExpansionPanelNew
        icon={<GroupIcon />}
        title="Operational Departments"
        items={operationalDepartments}
        selectedItems={selectedOperationalDepartments}
        onChange={onChange} />
    )
  }
}

PanelOperationalDepartments.propTypes = {
  operationalDepartments: PropTypes.any,
  selectedOperationalDepartments: PropTypes.any,
  onChange: PropTypes.func
}

export default PanelOperationalDepartments
