import React from 'react'
import PropTypes from 'prop-types'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

import ExpansionPanelNew from '~/components/ExpansionPanelNew'

class PanelCustomer extends React.PureComponent {
  render () {
    const {
      customers,
      selectedCustomers,
      onChange
    } = this.props

    return (
      <ExpansionPanelNew
        icon={<AssignmentIndIcon />}
        title="Customers"
        items={customers}
        selectedItems={selectedCustomers}
        onChange={onChange} />
    )
  }
}

PanelCustomer.propTypes = {
  customers: PropTypes.any,
  selectedCustomers: PropTypes.any,
  onChange: PropTypes.func
}

export default PanelCustomer
