import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteSelect from '~/components/AutoCompleteSelect'
import FlowDetailExpansionPanel from '../FlowDetailExpansionPanel'

const ProductionSitesExpansionPanel = ({ productionSites, selectedProductionSites, onChange }) =>
  <FlowDetailExpansionPanel title='Production Sites'>
    <AutoCompleteSelect
      name='productionSites'
      id='select-productionSites'
      instanceId='select-productionSites'
      value={selectedProductionSites}
      onChange={onChange}
      placeholder='Select Production Sites'
      options={productionSites.map(productionSite => ({
        label: productionSite.name,
        value: productionSite.name
      }))} />
  </FlowDetailExpansionPanel>

ProductionSitesExpansionPanel.propTypes = {
  productionSites: PropTypes.any,
  selectedProductionSites: PropTypes.any,
  onChange: PropTypes.func
}

export default ProductionSitesExpansionPanel
