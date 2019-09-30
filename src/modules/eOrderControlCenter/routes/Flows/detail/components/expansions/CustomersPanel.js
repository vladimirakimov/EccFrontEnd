import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteSelect from '~/components/AutoCompleteSelect'
import FlowDetailExpansionPanel from '../FlowDetailExpansionPanel'

const CustomersExpansionPanel = ({ customers, selectedCustomers, onChange }) =>
  <FlowDetailExpansionPanel title='Customers'>
    <AutoCompleteSelect
      name='customers'
      id='select-customers'
      instanceId='select-customers'
      value={selectedCustomers}
      onChange={onChange}
      placeholder='Select Customers'
      options={customers.map(customer => ({
        label: customer.name,
        value: customer.name
      }))} />
  </FlowDetailExpansionPanel>

CustomersExpansionPanel.propTypes = {
  customers: PropTypes.any,
  selectedCustomers: PropTypes.any,
  onChange: PropTypes.func
}

export default CustomersExpansionPanel
