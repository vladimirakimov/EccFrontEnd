import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteSelect from '~/components/AutoCompleteSelect'
import FlowDetailExpansionPanel from '../FlowDetailExpansionPanel'

const SourcesExpansionPanel = ({ selectedSources, sources, onChange }) =>
  <FlowDetailExpansionPanel title='Sources'>
    <AutoCompleteSelect
      value={selectedSources}
      onChange={onChange}
      placeholder='Select Sources'
      options={sources.map(source => ({
        label: source.name,
        value: source.name
      }))} />
  </FlowDetailExpansionPanel>

SourcesExpansionPanel.propTypes = {
  sources: PropTypes.any,
  selectedSources: PropTypes.any,
  onChange: PropTypes.func
}

export default SourcesExpansionPanel
