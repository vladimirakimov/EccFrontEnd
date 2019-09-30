import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar/AppBar'
import DeleteDialog from '~/components/DialogDelete'
import { generateRoute } from '~/utils/routeGenerator'
import { ACTIONS as DATA_ACTIONS } from '../../../redux/Team/team.actions'
import { ACTIONS as DATA_ACTIONS_SOURCES } from '../../../redux/Source/source.actions'
import { ACTIONS as DATA_ACTIONS_OPERATIONS } from '../../../redux/Operation/operation.actions'
import { ACTIONS as DATA_ACTIONS_LAYOUTS } from '../../../redux/Layout/layout.actions'
import { getSources } from '../../../redux/Source/source.selector'
import { getOperations } from '../../../redux/Operation/operation.selector'
import { getLayouts } from '../../../redux/Layout/layout.selector'
import {
  getTeam,
  getFilteredSitesForTeam,
  getFilteredOperationalDepartmentsForTeam,
  getFilteredTypePlanningsForTeam,
  getFilteredCustomersForTeam,
  getFilteredProductionSitesForTeam,
  getFilteredTransportTypesForTeam
} from '../../../redux/Team/team.selector'
import { ROUTES } from '../../config'
import { ACTIONS } from './redux/teamDetail.actions'
import TeamSettingsTab from './components/TeamSettingsTab'
import TeamMembersTab from './components/TeamMembersTab'
import TeamGeneralTab from './components/TeamGeneralTab'

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
    overflowY: 'scroll',
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
  }
})

class TeamDetail extends React.PureComponent {
  state = {
    deleteDialog: false
  }

  componentDidMount () {
    const {
      match,
      getTeam,
      getSources,
      getOperations,
      getLayouts
    } = this.props

    getTeam(match.params.id)
    getSources()
    getOperations()
    getLayouts()
  }

  handleMembersChange = members => {
    const { team } = this.props
    team.teamOperators = members
    this.forceUpdate()
  }

  handleBackButtonClicked = () => {
    const { history } = this.props
    history.push(generateRoute(ROUTES.TEAMS))
  }

  handleDeleteDialogOpen = () => {
    const { team, getTeam } = this.props
    getTeam(team.id)

    this.setState({ deleteDialog: true })
  }
  handleDeleteDialogClose = () => this.setState({ deleteDialog: false })
  handleDeleteDialogConfirm = () => {
    const { team, deleteTeam } = this.props

    deleteTeam(team.id)
  }

  render () {
    const { deleteDialog } = this.state
    const {
      classes,
      selectedTab,
      changeTab,
      team,
      updateTeam,
      sources,
      changeSources,
      layouts,
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
      changeTransportTypes,
      changeDriverWait } = this.props

    return (
      <div className={classes.root}>
        <AppBar
          title={`Team Detail - ${team && team.name ? team.name : ''}`}
          canGoBack={true}
          canSearch={false}
          goToPreviousPage={() => this.handleBackButtonClicked()} />

        <Grid container className={classes.container} spacing={8} direction="column">
          <Tabs
            className={classes.tabs}
            value={selectedTab}
            onChange={(e, tab) => changeTab(tab)}>
            <Tab value='general' label='General' />
            <Tab value='filters' label='Filters' />
            <Tab value='members' label='Members' />
          </Tabs>

          <div className={classes.content}>
            {team !== null &&
              <Formik
                enableReinitialize
                initialValues={{
                  name: team.name,
                  description: team.description,
                  image: team.image,
                  layout: team.layout
                }}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  const newTeam = {
                    ...team,
                    name: values.name,
                    description: values.description,
                    image: values.image,
                    layout: values.layout
                  }
                  updateTeam(newTeam)
                  setSubmitting(false)
                }}>
                {props =>
                  <form onSubmit={props.handleSubmit}>
                    {selectedTab === 'general' &&
                      <TeamGeneralTab
                        layouts={layouts}
                        {...props} />}
                    {selectedTab === 'filters' &&
                      <TeamSettingsTab
                        sources={sources}
                        sites={sites}
                        operations={operations}
                        operationalDepartments={operationalDepartments}
                        typePlannings={typePlannings}
                        customers={customers}
                        productionSites={productionSites}
                        transportTypes={transportTypes}
                        selectedSources={team.sources}
                        selectedSites={team.sites}
                        selectedOperations={team.operations}
                        selectedOperationalDepartments={team.operationalDepartments}
                        selectedTypePlannings={team.typePlannings}
                        selectedCustomers={team.customers}
                        selectedProductionSites={team.productionSites}
                        selectedTransportTypes={team.transportTypes}
                        selectedDriverWait={team.driverWait}
                        onSelectedSourcesChange={changeSources}
                        onSelectedSitesChange={changeSites}
                        onSelectedOperationsChange={changeOperations}
                        onSelectedOperationalDepartmentsChange={changeOperationalDepartments}
                        onSelectedTypePlanningsChange={changeTypePlannings}
                        onSelectedCustomersChange={changeCustomers}
                        onSelectedProductionSitesChange={changeProductionSites}
                        onSelectedTransportTypesChange={changeTransportTypes}
                        onSelectedDriverWaitChange={changeDriverWait}
                        {...props} />}
                    {selectedTab === 'members' &&
                      <TeamMembersTab
                        members={team.teamOperators}
                        onMembersChange={this.handleMembersChange}/>}

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

        {team &&
          <DeleteDialog
            isOpen={deleteDialog}
            title='Delete team'
            content={`Team ${team.name} and all the related information will be deleted. Are you sure?`}
            onConfirm={this.handleDeleteDialogConfirm}
            onCancel={this.handleDeleteDialogClose} />
        }
      </div>
    )
  }
}

TeamDetail.propTypes = {
  classes: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,

  selectedTab: PropTypes.string,
  changeTab: PropTypes.func,

  team: PropTypes.object,
  getTeam: PropTypes.func,
  updateTeam: PropTypes.func,
  deleteTeam: PropTypes.func,

  sources: PropTypes.any,
  getSources: PropTypes.func,
  changeSources: PropTypes.func,

  operations: PropTypes.any,
  getOperations: PropTypes.func,
  changeOperations: PropTypes.func,

  layouts: PropTypes.any,
  getLayouts: PropTypes.func,

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
  changeTransportTypes: PropTypes.func,

  changeDriverWait: PropTypes.func
}

const mapStateToProps = (state) => {
  return ({
    team: getTeam(state),
    sources: getSources(state),
    operations: getOperations(state),
    layouts: getLayouts(state),
    sites: getFilteredSitesForTeam(state),
    operationalDepartments: getFilteredOperationalDepartmentsForTeam(state),
    typePlannings: getFilteredTypePlanningsForTeam(state),
    customers: getFilteredCustomersForTeam(state),
    productionSites: getFilteredProductionSitesForTeam(state),
    transportTypes: getFilteredTransportTypesForTeam(state),
    selectedTab: state.pages.teams.teamDetail.selectedTab
  })
}

const mapDispatchToProps = (dispatch) => ({
  getTeam: id => dispatch(DATA_ACTIONS.getById(id)),
  getSources: () => dispatch(DATA_ACTIONS_SOURCES.getListSources()),
  getOperations: () => dispatch(DATA_ACTIONS_OPERATIONS.getList()),
  getLayouts: () => dispatch(DATA_ACTIONS_LAYOUTS.getList()),
  updateTeam: team => dispatch(DATA_ACTIONS.update(team)),
  deleteTeam: teamId => dispatch(DATA_ACTIONS.delete(teamId)),
  changeTab: tab => dispatch(ACTIONS.changeTab(tab)),
  changeSources: sources => dispatch(DATA_ACTIONS.changeSources(sources)),
  changeSites: sites => dispatch(DATA_ACTIONS.changeSites(sites)),
  changeOperations: operations => dispatch(DATA_ACTIONS.changeOperations(operations)),
  changeOperationalDepartments: operationalDepartments => dispatch(DATA_ACTIONS.changeOperationalDepartments(operationalDepartments)),
  changeTypePlannings: typePlannings => dispatch(DATA_ACTIONS.changeTypePlannings(typePlannings)),
  changeCustomers: customers => dispatch(DATA_ACTIONS.changeCustomers(customers)),
  changeProductionSites: productionSites => dispatch(DATA_ACTIONS.changeProductionSites(productionSites)),
  changeTransportTypes: transportTypes => dispatch(DATA_ACTIONS.changeTransportTypes(transportTypes)),
  changeDriverWait: driverWait => dispatch(DATA_ACTIONS.changeDriverWait(driverWait))
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamDetail)))
