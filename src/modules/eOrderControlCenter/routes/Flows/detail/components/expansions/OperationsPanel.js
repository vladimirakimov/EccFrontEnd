import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteSelect from '~/components/AutoCompleteSelect'
import FlowDetailExpansionPanel from '../FlowDetailExpansionPanel'

const OperationsExpansionPanel = ({ operations, selectedOperations, onChange }) =>
  <FlowDetailExpansionPanel title='Operations'>
    <AutoCompleteSelect
      name='operations'
      id='select-operations'
      instanceId='select-operations'
      value={selectedOperations}
      onChange={onChange}
      placeholder='Select Operations'
      options={operations.map(operation => ({
        label: operation.name,
        value: operation.name
      }))} />
  </FlowDetailExpansionPanel>

OperationsExpansionPanel.propTypes = {
  operations: PropTypes.any,
  selectedOperations: PropTypes.any,
  onChange: PropTypes.func
}

export default OperationsExpansionPanel
