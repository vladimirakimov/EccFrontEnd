import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteSelect from '~/components/AutoCompleteSelect'
import FlowDetailExpansionPanel from '../FlowDetailExpansionPanel'

const SitesExpansionPanel = ({ sites, selectedSites, onChange }) =>
  <FlowDetailExpansionPanel title='Sites'>
    <AutoCompleteSelect
      name='sites'
      id='select-sites'
      instanceId='select-sites'
      value={selectedSites}
      onChange={onChange}
      placeholder='Select Sites'
      options={sites.map(site => ({
        label: site.name,
        value: site.name
      }))} />
  </FlowDetailExpansionPanel>

SitesExpansionPanel.propTypes = {
  sites: PropTypes.any,
  selectedSites: PropTypes.any,
  onChange: PropTypes.func
}

export default SitesExpansionPanel
