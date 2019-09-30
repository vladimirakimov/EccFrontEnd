import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteSelect from '~/components/AutoCompleteSelect'
import FlowDetailExpansionPanel from '../FlowDetailExpansionPanel'

const OperationalDepartmentsExpansionPanel = ({ operationalDepartments, selectedOperationalDepartments, onChange }) =>
  <FlowDetailExpansionPanel title='Operational Departments'>
    <AutoCompleteSelect
      name='operationalDepartments'
      id='select-operationalDepartments'
      instanceId='select-operationalDepartments'
      value={selectedOperationalDepartments}
      onChange={onChange}
      placeholder='Select Operational Departments'
      options={operationalDepartments.map(operationalDepartment => ({
        label: operationalDepartment.name,
        value: operationalDepartment.name
      }))} />
  </FlowDetailExpansionPanel>

OperationalDepartmentsExpansionPanel.propTypes = {
  operationalDepartments: PropTypes.any,
  selectedOperationalDepartments: PropTypes.any,
  onChange: PropTypes.func
}

export default OperationalDepartmentsExpansionPanel
