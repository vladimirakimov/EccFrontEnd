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
import { ACTIONS as DATA_ACTIONS } from '../../../redux/Layout/layout.actions'
import { getLayouts, getLayout, layoutCreateModal } from '../../../redux/Layout/layout.selector'
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

class Layouts extends React.PureComponent {
  state = {
    searchString: null,
    layouts: null,
    deleteDialog: false
  }

  componentDidMount () {
    const { getLayouts } = this.props
    getLayouts()
  }

  componentDidUpdate (oldProps) {
    if (this.props.layouts !== oldProps.layouts) {
      this.filterLayouts()
    }
  }

  handleCreateDialogOpen = () => this.props.openCreateModal()
  handleCreateDialogClose = () => this.props.hideCreateModal()
  handleCreateDialogSubmit = newLayout => {
    const { createLayout } = this.props
    createLayout(newLayout)
  }

  handleSearchChange = value => this.filterLayouts(value)
  filterLayouts = newSearchString => {
    const { layouts } = this.props
    let searchString = newSearchString
    if (searchString === undefined) {
      searchString = this.state.searchString
    }

    if (searchString === null || searchString === '') {
      this.setState({ layouts })

      return
    }

    this.setState({ searchString })
    const words = searchString.split(' ')
    const filtered = layouts.filter(layout => {
      return words.every(word => {
        return layout.name.toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })

    this.setState({
      layouts: filtered
    })
  }

  handleDetailClicked = layout => {
    const { history } = this.props
    history.push(generateRoute(ROUTES.LAYOUTDETAIL, { id: layout.id }))
  }

  handleDeleteDialogOpen = layout => {
    this.props.getLayout(layout.id)
    this.setState({ deleteDialog: true })
  }
  handleDeleteDialogClose = () => this.setState({ deleteDialog: false })
  handleDeleteDialogConfirm = () => {
    const { layout, deleteLayout } = this.props

    deleteLayout(layout.id)
    this.handleDeleteDialogClose()
  }

  render () {
    const { classes, layout, createModal } = this.props
    const { layouts, deleteDialog } = this.state

    return (
      <React.Fragment>
        <AppBar
          isSearchBarAvailable={true}
          onSearchChange={this.handleSearchChange}
          title='Layouts' />

        <div className={classes.root}>
          <ButtonAdd onClick={this.handleCreateDialogOpen} />

          <Grid container spacing={8} alignItems='stretch'>
            {layouts && layouts.map((layout, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                <OverviewCard
                  mediaImage={layout.image || defaultImage}
                  mediaTitle={layout.name}
                  title={layout.name}
                  content={layout.description}
                  onDetailClicked={() => this.handleDetailClicked(layout)}
                  onDeleteClicked={() => this.handleDeleteDialogOpen(layout)} />
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
          title='Delete layout'
          content={`Lauout - ${layout ? layout.name : ''} and all the related information will be deleted. Are you sure?`}
          onConfirm={this.handleDeleteDialogConfirm}
          onCancel={this.handleDeleteDialogClose} />
      </React.Fragment>
    )
  }
}

Layouts.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  layouts: PropTypes.array,
  layout: PropTypes.object,
  getLayouts: PropTypes.func,
  getLayout: PropTypes.func,
  createLayout: PropTypes.func,
  deleteLayout: PropTypes.func,
  createModal: PropTypes.bool,
  openCreateModal: PropTypes.func,
  hideCreateModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  layouts: getLayouts(state),
  layout: getLayout(state),
  createModal: layoutCreateModal(state)
})

const mapDispatchToProps = (dispatch) => ({
  getLayouts: () => dispatch(DATA_ACTIONS.getList()),
  getLayout: id => dispatch(DATA_ACTIONS.getById(id)),
  createLayout: newLayout => dispatch(DATA_ACTIONS.create(newLayout)),
  deleteLayout: layoutId => dispatch(DATA_ACTIONS.delete(layoutId)),
  openCreateModal: () => dispatch(DATA_ACTIONS.showCreateDialog()),
  hideCreateModal: () => dispatch(DATA_ACTIONS.hideCreateDialog())
})

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Layouts)))
