import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar/AppBar'
import DeleteDialog from '~/components/DialogDelete'
import { generateRoute } from '~/utils/routeGenerator'
import { ACTIONS as DATA_ACTIONS } from '../../../redux/Flow/flow.actions'
import { ACTIONS as DATA_ACTIONS_SOURCES } from '../../../redux/Source/source.actions'
import { ACTIONS as DATA_ACTIONS_OPERATIONS } from '../../../redux/Operation/operation.actions'
import { getSources } from '../../../redux/Source/source.selector'
import { getOperations } from '../../../redux/Operation/operation.selector'
import {
  getFlow,
  getFilteredSitesForFlow,
  getFilteredOperationalDepartmentsForFlow,
  getFilteredTypePlanningsForFlow,
  getFilteredCustomersForFlow,
  getFilteredProductionSitesForFlow,
  getFilteredTransportTypesForFlow
} from '../../../redux/Flow/flow.selector'
import { ROUTES } from '../../config'
import { ACTIONS } from './redux/flowDetail.actions'
import GeneralTab from './components/tabs/GeneralTab'
import FiltersTab from './components/tabs/FiltersTab'
import FlowTab from './components/tabs/FlowTab'
import Application from './components/diagram/Application'

const styles = theme => ({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    padding: '80px 16px 16px',
    background: theme.palette.default.background
  },
  container: {
    position: 'relative',
    background: theme.palette.default.card,
    border: `1px solid ${theme.palette.default.border}`
  },
  content: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 210px)',
    marginBottom: 70
  },
  tabs: {
    color: theme.palette.default.contrastText,
    borderBottom: `1px solid ${theme.palette.default.border}`
  },
  controlsContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 70,
    padding: '0 16px',
    background: theme.palette.default.card,
    borderTop: `1px solid ${theme.palette.default.border}`,
    '& button:not(:last-child)': {
      marginRight: 16
    }
  },
  form: {
    height: '100%'
  }
})

class FlowDetail extends React.PureComponent {
  state = {
    deleteDialog: false
  }

  constructor (props) {
    super(props)
    this.diagramApp = new Application()
  }

  componentDidMount () {
    const {
      match,
      getFlow,
      getSources,
      getOperations
    } = this.props

    getFlow(match.params.id)
    getSources()
    getOperations()
  }

  handleBackButtonClicked = () => {
    const { history } = this.props
    history.push(generateRoute(ROUTES.FLOWS))
  }

  handleDeleteDialogOpen = () => {
    const { flow, getFlow } = this.props
    getFlow(flow.id)

    this.setState({ deleteDialog: true })
  }

  handleDeleteDialogClose = () => this.setState({ deleteDialog: false })

  handleDeleteDialogConfirm = () => {
    const { history, flow, deleteFlow } = this.props

    deleteFlow(flow.id)
    history.push(generateRoute(ROUTES.FLOWS))
  }

  render () {
    const {
      classes,
      selectedTab,
      changeTab,
      flow,
      updateFlow,
      sources,
      changeSources,
      sites,
      changeSites,
      operations,
      changeOperations,
      operationalDepartments,
      changeOperationalDepartments,
      typePlannings,
      changeTypePlannings,
      customers,
      changeCustomers,
      productionSites,
      changeProductionSites,
      transportTypes,
      changeTransportTypes
    } = this.props

    const { deleteDialog } = this.state

    return (
      <div className={classes.root}>
        <AppBar
          title={`Flow Detail - ${flow.name ? flow.name : ''}`}
          canGoBack
          canSearch={false}
          goToPreviousPage={() => this.handleBackButtonClicked()} />

        <Grid container className={classes.container} spacing={8} direction="column">
          <Tabs
            className={classes.tabs}
            value={selectedTab}
            onChange={(e, tab) => changeTab(tab)}>
            <Tab value='general' label='General' />
            <Tab value='filters' label='Filters' />
            <Tab value='flow' label='Flow' />
          </Tabs>

          <div className={classes.content}>
            {Object.keys(flow).length > 0 &&
              <Formik
                enableReinitialize
                initialValues={{
                  name: flow.name,
                  description: flow.description,
                  image: flow.image
                }}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  const newFlow = {
                    ...flow,
                    name: values.name,
                    description: values.description,
                    image: values.image
                  }
                  updateFlow(newFlow)
                  setSubmitting(false)
                }}>
                {props =>
                  <form onSubmit={props.handleSubmit} className={classes.form}>
                    {selectedTab === 'general' &&
                      <GeneralTab {...props} />}
                    {selectedTab === 'filters' &&
                      <FiltersTab
                        sources={sources}
                        sites={sites}
                        operations={operations}
                        operationalDepartments={operationalDepartments}
                        typePlannings={typePlannings}
                        customers={customers}
                        productionSites={productionSites}
                        transportTypes={transportTypes}
                        selectedSources={flow.sources}
                        selectedSites={flow.sites}
                        selectedOperations={flow.operations}
                        selectedOperationalDepartments={flow.operationalDepartments}
                        selectedTypePlannings={flow.typePlannings}
                        selectedCustomers={flow.customers}
                        selectedProductionSites={flow.productionSites}
                        selectedTransportTypes={flow.transportTypes}
                        onSelectedSourcesChange={changeSources}
                        onSelectedSitesChange={changeSites}
                        onSelectedOperationsChange={changeOperations}
                        onSelectedOperationalDepartmentsChange={changeOperationalDepartments}
                        onSelectedTypePlanningsChange={changeTypePlannings}
                        onSelectedCustomersChange={changeCustomers}
                        onSelectedProductionSitesChange={changeProductionSites}
                        onSelectedTransportTypesChange={changeTransportTypes}
                        {...props} />}
                    {selectedTab === 'flow' &&
                      <FlowTab diagramApp={this.diagramApp} />}

                    <Grid container className={classes.controlsContainer}>
                      <Button onClick={this.handleDeleteDialogOpen} variant="outlined">
                        Delete
                      </Button>
                      <Button type='submit' variant="contained" color="primary">
                        Save
                      </Button>
                    </Grid>
                  </form>
                }
              </Formik>
            }
          </div>
        </Grid>

        {flow &&
          <DeleteDialog
            isOpen={deleteDialog}
            title='Delete flow'
            content={`Flow ${flow.name} and all the related information will be deleted. Are you sure?`}
            onConfirm={this.handleDeleteDialogConfirm}
            onCancel={this.handleDeleteDialogClose} />
        }
      </div>
    )
  }
}

FlowDetail.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,

  selectedTab: PropTypes.string,
  changeTab: PropTypes.func,

  flow: PropTypes.object,
  getFlow: PropTypes.func,
  updateFlow: PropTypes.func,
  deleteFlow: PropTypes.func,

  sources: PropTypes.any,
  getSources: PropTypes.func,
  changeSources: PropTypes.func,

  operations: PropTypes.any,
  getOperations: PropTypes.func,
  changeOperations: PropTypes.func,

  operationalDepartments: PropTypes.any,
  changeOperationalDepartments: PropTypes.func,

  customers: PropTypes.any,
  changeCustomers: PropTypes.func,

  sites: PropTypes.any,
  changeSites: PropTypes.func,

  typePlannings: PropTypes.any,
  changeTypePlannings: PropTypes.func,

  productionSites: PropTypes.any,
  changeProductionSites: PropTypes.func,

  transportTypes: PropTypes.any,
  changeTransportTypes: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return ({
    selectedTab: state.pages.flows.flowDetail.selectedTab,
    flow: getFlow(state),
    sources: getSources(state),
    operations: getOperations(state),
    sites: getFilteredSitesForFlow(state),
    operationalDepartments: getFilteredOperationalDepartmentsForFlow(state),
    typePlannings: getFilteredTypePlanningsForFlow(state),
    customers: getFilteredCustomersForFlow(state),
    productionSites: getFilteredProductionSitesForFlow(state),
    transportTypes: getFilteredTransportTypesForFlow(state)
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeTab: tab => dispatch(ACTIONS.changeTab(tab)),
  getFlow: id => dispatch(DATA_ACTIONS.getById(id)),
  updateFlow: flow => dispatch(DATA_ACTIONS.update(flow)),
  deleteFlow: id => dispatch(DATA_ACTIONS.delete(id)),
  getSources: () => dispatch(DATA_ACTIONS_SOURCES.getListSources()),
  changeSources: sources => dispatch(DATA_ACTIONS.changeSources(sources)),
  getOperations: () => dispatch(DATA_ACTIONS_OPERATIONS.getList()),
  changeOperations: operations => dispatch(DATA_ACTIONS.changeOperations(operations)),
  changeSites: sites => dispatch(DATA_ACTIONS.changeSites(sites)),
  changeOperationalDepartments: operationalDepartments => dispatch(DATA_ACTIONS.changeOperationalDepartments(operationalDepartments)),
  changeTypePlannings: typePlannings => dispatch(DATA_ACTIONS.changeTypePlannings(typePlannings)),
  changeCustomers: customers => dispatch(DATA_ACTIONS.changeCustomers(customers)),
  changeProductionSites: productionSites => dispatch(DATA_ACTIONS.changeProductionSites(productionSites)),
  changeTransportTypes: transportTypes => dispatch(DATA_ACTIONS.changeTransportTypes(transportTypes))
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(FlowDetail)))
