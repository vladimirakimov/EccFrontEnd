import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar'
import ButtonAdd from '~/components/ButtonAdd'
import OverviewCard from '~/components/OverviewCard'
import DeleteDialog from '~/components/DialogDelete'
import defaultImage from '~/images/layout_default.png'
import { generateRoute } from '~/utils/routeGenerator'
import { ACTIONS as DATA_ACTIONS } from '../../../redux/Flow/flow.actions'
import { getFlow, getFlows, flowCreateModal } from '../../../redux/Flow/flow.selector'
import { ROUTES } from '../../config'
import CreateDialog from './components/CreateDialog'

const styles = () => ({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 96px)',
    padding: '80px 16px 16px'
  }
})

class Flows extends React.PureComponent {
  state = {
    searchString: null,
    flows: null,
    deleteDialog: false
  }

  handleCreateDialogOpen = () => this.props.openCreateModal()
  handleCreateDialogClose = () => this.props.hideCreateModal()
  handleCreateDialogSubmit = (newFlow) => {
    const { createFlow } = this.props
    createFlow(newFlow)
  }

  handleDeleteDialogOpen = flow => {
    this.props.getFlow(flow.id)

    this.setState({ deleteDialog: true })
  }

  handleDeleteDialogClose = () => this.setState({ deleteDialog: false })

  handleDeleteDialogConfirm = () => {
    const { flow, deleteFlow } = this.props

    deleteFlow(flow.id)
    this.handleDeleteDialogClose()
  }

  componentDidMount () {
    const { getFlows } = this.props
    getFlows()
  }

  handleSearchChange = value => {
    this.filterLayouts(value)
  }

  filterLayouts = newSearchString => {
    const { flows } = this.props
    let searchString = newSearchString
    if (searchString === undefined) {
      searchString = this.state.searchString
    }

    if (searchString === null || searchString === '') {
      this.setState({ flows })

      return
    }

    this.setState({ searchString })
    const words = searchString.split(' ')
    const filtered = flows.filter(flow => {
      return words.every(word => {
        return flow.name.toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })

    this.setState({
      flows: filtered
    })
  }

  componentDidUpdate (oldProps) {
    if (this.props.flows !== oldProps.flows) {
      this.filterLayouts()
    }
  }

  handleDetailClicked = flow => {
    const { history } = this.props
    history.push(generateRoute(ROUTES.FLOWDETAIL, { id: flow.id }))
  }

  render () {
    const { classes, flow, createModal } = this.props
    const { flows, deleteDialog } = this.state

    return (
      <React.Fragment>
        <AppBar
          title='Flows'
          isSearchBarAvailable={true}
          onSearchChange={this.handleSearchChange} />

        <div className={classes.root}>
          <ButtonAdd onClick={this.handleCreateDialogOpen} />

          <Grid container spacing={8} alignItems='stretch'>
            {flows && flows.map((flow, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                <OverviewCard
                  mediaImage={flow.image || defaultImage}
                  mediaTitle={flow.name}
                  title={flow.name}
                  content={flow.description}
                  onDetailClicked={e => this.handleDetailClicked(flow)}
                  onDeleteClicked={() => this.handleDeleteDialogOpen(flow)} />
              </Grid>
            ))}
          </Grid>
        </div>

        <CreateDialog
          isOpen={createModal}
          onClose={this.handleCreateDialogClose}
          onSubmit={this.handleCreateDialogSubmit} />

        <DeleteDialog
          isOpen={deleteDialog}
          title='Delete flow'
          content={`Flow ${flow ? flow.name : ''} and all the related information will be deleted. Are you sure?`}
          onConfirm={this.handleDeleteDialogConfirm}
          onCancel={this.handleDeleteDialogClose} />
      </React.Fragment>
    )
  }
}

Flows.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  flow: PropTypes.object,
  flows: PropTypes.array,
  getFlow: PropTypes.func,
  getFlows: PropTypes.func,
  createFlow: PropTypes.func,
  deleteFlow: PropTypes.func,
  createModal: PropTypes.bool,
  openCreateModal: PropTypes.func,
  hideCreateModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  flow: getFlow(state),
  flows: getFlows(state),
  createModal: flowCreateModal(state)
})

const mapDispatchToProps = (dispatch) => ({
  getFlow: id => dispatch(DATA_ACTIONS.getById(id)),
  getFlows: () => dispatch(DATA_ACTIONS.getList()),
  createFlow: newFlow => dispatch(DATA_ACTIONS.create(newFlow)),
  deleteFlow: id => dispatch(DATA_ACTIONS.delete(id)),
  openCreateModal: () => dispatch(DATA_ACTIONS.showCreateDialog()),
  hideCreateModal: () => dispatch(DATA_ACTIONS.hideCreateDialog())
})

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Flows)))
