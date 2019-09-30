import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import SourcesPanel from '../expansions/SourcesPanel'
import SitesPanel from '../expansions/SitesPanel'
import OperationsPanel from '../expansions/OperationsPanel'
import OperationalDepartmensPanel from '../expansions/OperationalDepartmensPanel'
import TypePlanningsPanel from '../expansions/TypePlanningsPanel'
import CustomersPanel from '../expansions/CustomersPanel'
import ProductionSitesPanel from '../expansions/ProductionSitesPanel'
import TransportTypesPanel from '../expansions/TransportTypesPanel'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3
  }
})

class FlowFiltersTab extends React.PureComponent {
  state = {
    single: null,
    multi: null,
    multiLabel: null
  }

  render () {
    const {
      classes,

      sources,
      selectedSources,
      onSelectedSourcesChange,

      sites,
      selectedSites,
      onSelectedSitesChange,

      operations,
      selectedOperations,
      onSelectedOperationsChange,

      operationalDepartments,
      selectedOperationalDepartments,
      onSelectedOperationalDepartmentsChange,

      typePlannings,
      selectedTypePlannings,
      onSelectedTypePlanningsChange,

      customers,
      selectedCustomers,
      onSelectedCustomersChange,

      productionSites,
      selectedProductionSites,
      onSelectedProductionSitesChange,

      transportTypes,
      selectedTransportTypes,
      onSelectedTransportTypesChange
    } = this.props

    return (
      <div className={classes.root}>
        <SourcesPanel
          sources={sources}
          selectedSources={selectedSources}
          onChange={onSelectedSourcesChange} />
        <SitesPanel
          sites={sites}
          selectedSites={selectedSites}
          onChange={onSelectedSitesChange} />
        <OperationsPanel
          operations={operations}
          selectedOperations={selectedOperations}
          onChange={onSelectedOperationsChange} />
        <OperationalDepartmensPanel
          operationalDepartments={operationalDepartments}
          selectedOperationalDepartments={selectedOperationalDepartments}
          onChange={onSelectedOperationalDepartmentsChange} />
        <TypePlanningsPanel
          typePlannings={typePlannings}
          selectedTypePlannings={selectedTypePlannings}
          onChange={onSelectedTypePlanningsChange} />
        <CustomersPanel
          customers={customers}
          selectedCustomers={selectedCustomers}
          onChange={onSelectedCustomersChange} />
        <ProductionSitesPanel
          productionSites={productionSites}
          selectedProductionSites={selectedProductionSites}
          onChange={onSelectedProductionSitesChange} />
        <TransportTypesPanel
          transportTypes={transportTypes}
          selectedTransportTypes={selectedTransportTypes}
          onChange={onSelectedTransportTypesChange} />
      </div >
    )
  }
}

FlowFiltersTab.propTypes = {
  classes: PropTypes.object,

  sources: PropTypes.any,
  selectedSources: PropTypes.any,
  onSelectedSourcesChange: PropTypes.func,

  sites: PropTypes.any,
  selectedSites: PropTypes.any,
  onSelectedSitesChange: PropTypes.func,

  operations: PropTypes.any,
  selectedOperations: PropTypes.any,
  onSelectedOperationsChange: PropTypes.any,

  operationalDepartments: PropTypes.any,
  selectedOperationalDepartments: PropTypes.any,
  onSelectedOperationalDepartmentsChange: PropTypes.func,

  typePlannings: PropTypes.any,
  selectedTypePlannings: PropTypes.any,
  onSelectedTypePlanningsChange: PropTypes.func,

  customers: PropTypes.any,
  selectedCustomers: PropTypes.any,
  onSelectedCustomersChange: PropTypes.func,

  productionSites: PropTypes.any,
  selectedProductionSites: PropTypes.any,
  onSelectedProductionSitesChange: PropTypes.func,

  transportTypes: PropTypes.any,
  selectedTransportTypes: PropTypes.any,
  onSelectedTransportTypesChange: PropTypes.func
}

export default withStyles(styles)(FlowFiltersTab)
