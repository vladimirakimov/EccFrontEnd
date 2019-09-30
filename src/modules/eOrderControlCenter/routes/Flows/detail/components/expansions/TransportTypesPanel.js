import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteSelect from '~/components/AutoCompleteSelect'
import FlowDetailExpansionPanel from '../FlowDetailExpansionPanel'

const TransportTypesExpansionPanel = ({ transportTypes, selectedTransportTypes, onChange }) =>
  <FlowDetailExpansionPanel title='Transport Types'>
    <AutoCompleteSelect
      name='transportTypes'
      id='select-transportTypes'
      instanceId='select-transportTypes'
      value={selectedTransportTypes}
      onChange={onChange}
      placeholder='Select Transport Types'
      options={transportTypes.map(transportType => ({
        label: transportType.name,
        value: transportType.name
      }))} />
  </FlowDetailExpansionPanel>

TransportTypesExpansionPanel.propTypes = {
  transportTypes: PropTypes.any,
  selectedTransportTypes: PropTypes.any,
  onChange: PropTypes.func
}

export default TransportTypesExpansionPanel
