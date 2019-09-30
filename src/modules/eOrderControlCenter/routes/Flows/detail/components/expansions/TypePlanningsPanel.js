import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteSelect from '~/components/AutoCompleteSelect'
import FlowDetailExpansionPanel from '../FlowDetailExpansionPanel'

const TypePlanningsExpansionPanel = ({ typePlannings, selectedTypePlannings, onChange }) =>
  <FlowDetailExpansionPanel title='Type Plannings'>
    <AutoCompleteSelect
      name='typePlannings'
      id='select-typePlannings'
      instanceId='select-typePlannings'
      value={selectedTypePlannings}
      onChange={onChange}
      placeholder='Select Type Plannings'
      options={typePlannings.map(typePlanning => ({
        label: typePlanning.name,
        value: typePlanning.name
      }))} />
  </FlowDetailExpansionPanel>

TypePlanningsExpansionPanel.propTypes = {
  typePlannings: PropTypes.any,
  selectedTypePlannings: PropTypes.any,
  onChange: PropTypes.func
}

export default TypePlanningsExpansionPanel
