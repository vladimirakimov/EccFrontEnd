import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import PanelSources from './Expansions/PanelSources'
import PanelSites from './Expansions/PanelSites'
import PanelOperations from './Expansions/PanelOperations'
import PanelOperationalDepartments from './Expansions/PanelOperationalDepartments'
import PanelTypePlannings from './Expansions/PanelTypePlannings'
import PanelCustomers from './Expansions/PanelCustomers'
import PanelProductionSites from './Expansions/PanelProductionSites'
import PanelTransportTypes from './Expansions/PanelTransportTypes'
import PanelDriverWaits from './Expansions/PanelDriverWaits'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3
  }
})

class TeamSettingsTab extends React.Component {
  constructor (props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick = item => {
    const newList = this.state.selected
    newList.push(item)
    this.setState({
      selected: newList
    })
    this.forceUpdate()
  }

  handleSwitchChange = () => {
    this.setState(prevState => {
      return {
        checked: !prevState.checked
      }
    })
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
      onSelectedTransportTypesChange,

      selectedDriverWait,
      onSelectedDriverWaitChange
    } = this.props

    return (
      <div className={classes.root}>
        <PanelSources
          sources={sources}
          selectedSources={selectedSources}
          onChange={onSelectedSourcesChange} />
        <PanelSites
          sites={sites}
          selectedSites={selectedSites}
          onChange={onSelectedSitesChange} />
        <PanelOperations
          operations={operations}
          selectedOperations={selectedOperations}
          onChange={onSelectedOperationsChange} />
        <PanelOperationalDepartments
          operationalDepartments={operationalDepartments}
          selectedOperationalDepartments={selectedOperationalDepartments}
          onChange={onSelectedOperationalDepartmentsChange} />
        <PanelTypePlannings
          typePlannings={typePlannings}
          selectedTypePlannings={selectedTypePlannings}
          onChange={onSelectedTypePlanningsChange} />
        <PanelCustomers
          customers={customers}
          selectedCustomers={selectedCustomers}
          onChange={onSelectedCustomersChange} />
        <PanelProductionSites
          productionSites={productionSites}
          selectedProductionSites={selectedProductionSites}
          onChange={onSelectedProductionSitesChange} />
        <PanelTransportTypes
          transportTypes={transportTypes}
          selectedTransportTypes={selectedTransportTypes}
          onChange={onSelectedTransportTypesChange} />
        <PanelDriverWaits
          selectedDriverWait={selectedDriverWait}
          onChange={onSelectedDriverWaitChange} />
      </div >
    )
  }
}

TeamSettingsTab.propTypes = {
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
  onSelectedTransportTypesChange: PropTypes.func,

  selectedDriverWait: PropTypes.any,
  onSelectedDriverWaitChange: PropTypes.func
}

export default withStyles(styles)(TeamSettingsTab)
