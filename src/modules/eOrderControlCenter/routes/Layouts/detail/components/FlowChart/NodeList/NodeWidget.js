import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { ACTIONS } from '../../../redux/layoutDetail.actions'
import InputDialog from '../../InputDialog'
import DeleteDialog from '../../DeleteDialog'
import ConfigDialog from '../../ScreensConfig/ListScreen/ConfigDialog'
import InputPortWidget from '../Common/InputPortWidget'
import NodeCard from './NodeCard'

class NodeWidget extends React.Component {
  state = {
    tabName: '',
    deleteTabName: '',
    tabDescription: '',
    tabIcon: '',
    tabFilters: [],
    tabWorkOrderButtons: [],
    tabShowOperationIcon: null,
    selectedTab: null,
    isDeleteDialogOpen: false,
    isAddDialogOpen: false,
    errorOccured: false,
    errorMessage: ''
  }

  addTab = () => {
    this.setState({
      isAddDialogOpen: true,
      tabName: ''
    })
  }

  closeDialog = () => {
    this.setState({
      isAddDialogOpen: false,
      errorOccured: false,
      errorMessage: ''
    })
  }

  handleDialogCancel = () => {
    this.closeDialog()
  }

  handleDialogAdd = () => {
    const { node } = this.props
    const { tabName } = this.state
    const tabList = node.tabs.map(t => t.name.toLowerCase())
    if (!tabList.includes(tabName.toLowerCase().trim())) {
      this.closeDialog()
      node.addTab(tabName)
      this.forceUpdate()
    } else {
      this.setState({
        errorOccured: true,
        errorMessage: 'Duplicated name'
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      tabName: e.target.value
    })
  }

  handleNameChange = e => {
    const { node } = this.props
    node.name = e.target.value
    this.forceUpdate()
  }

  handleTabClick = tab => {
    const { node, toggleDiagramWidgetZoom } = this.props
    node.selected = false
    toggleDiagramWidgetZoom()

    this.setState({
      selectedTab: tab,
      tabName: tab.name,
      tabDescription: tab.description,
      tabIcon: tab.icon,
      tabFilters: tab.filters,
      tabWorkOrderButtons: tab.workOrderButtons,
      tabShowOperationIcon: tab.showOperationIcon
    })
  }

  deleteTab = (port) => {
    this.setState({
      isDeleteDialogOpen: true,
      deleteTabPort: port,
      deleteTabName: port.name
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      isDeleteDialogOpen: false
    })
  }

  handleDeleteConfirm = () => {
    this.closeDeleteDialog()
    this.handleTabDelete()
    this.setState({
      deleteTabName: ''
    })
  }

  handleTabDelete = () => {
    const { deleteTabPort } = this.state
    const { node } = this.props
    node.removeTab(deleteTabPort)
    this.forceUpdate()
  }

  handleTabConfigDialogClose = () => {
    const { toggleDiagramWidgetZoom } = this.props
    const {
      selectedTab,
      tabName,
      tabDescription,
      tabIcon,
      tabFilters,
      tabWorkOrderButtons,
      tabShowOperationIcon
    } = this.state
    selectedTab.name = tabName
    selectedTab.description = tabDescription
    selectedTab.icon = tabIcon
    selectedTab.filters = tabFilters
    selectedTab.workOrderButtons = tabWorkOrderButtons
    selectedTab.showOperationIcon = tabShowOperationIcon

    toggleDiagramWidgetZoom()
    this.forceUpdate()

    this.setState({
      selectedTab: null
    })
  }

  handleTabNameChange = e => {
    this.setState({
      tabName: e.target.value
    })
  }

  handleTabDescriptionChange = e => {
    this.setState({
      tabDescription: e.target.value
    })
  }

  handleTabIconChange = e => {
    this.setState({
      tabIcon: e.target.value
    })
  }

  handleTabFilterAdd = newFilter => {
    const { tabFilters } = this.state
    const filters = [
      ...tabFilters,
      newFilter
    ]

    this.setState({
      tabFilters: filters
    })
  }

  handleTabFiltersUpdate = updatedFilter => {
    const { tabFilters } = this.state
    const filters = [
      ...tabFilters.filter(f => f.id !== updatedFilter.id),
      updatedFilter
    ]

    this.setState({
      tabFilters: filters
    })
  }

  handleTabFiltersDelete = ids => {
    const { tabFilters } = this.state
    const remainedFilters = tabFilters.filter(f => !ids.includes(f.id))

    this.setState({
      tabFilters: remainedFilters
    })
  }

  handleTabButtonAdd = newButton => {
    const { tabWorkOrderButtons } = this.state
    const buttons = [
      ...tabWorkOrderButtons,
      newButton
    ]

    this.setState({
      tabWorkOrderButtons: buttons
    })
  }

  handleTabButtonUpdate = updatedButton => {
    const { tabWorkOrderButtons } = this.state
    const buttons = [
      ...tabWorkOrderButtons.filter(f => f.id !== updatedButton.id),
      updatedButton
    ]

    this.setState({
      tabWorkOrderButtons: buttons
    })
  }

  handleTabButtonsDelete = ids => {
    const { tabWorkOrderButtons } = this.state
    const remainedButtons = tabWorkOrderButtons.filter(b => !ids.includes(b.id))

    this.setState({
      tabWorkOrderButtons: remainedButtons
    })
  }

  handleTabShowOperationIconChange = () => {
    this.setState(prevState => ({
      tabShowOperationIcon: !prevState.tabShowOperationIcon
    }))
  }

  render () {
    const { node } = this.props
    const {
      tabName,
      deleteTabName,
      tabDescription,
      tabIcon,
      tabFilters,
      tabWorkOrderButtons,
      tabShowOperationIcon,
      selectedTab,
      isAddDialogOpen,
      isDeleteDialogOpen,
      errorOccured,
      errorMessage
    } = this.state
    const inputPort = Object.keys(node.ports)
      .filter(key => node.ports[key].in === true)
      .map(key => node.ports[key])[0]

    return (
      <React.Fragment>
        <Grid container alignItems='baseline' direction='row' justify='center'>
          <Grid item>
            <InputPortWidget name={inputPort.name} node={node} />
          </Grid>
          <Grid item>
            <NodeCard
              isSelected={node.selected}
              title={node.name}
              subheader='List Screen'
              node={node}
              onTabClick={this.handleTabClick}
              onButtonDelete={this.deleteTab}
              onAddButtonClick={this.addTab}
              onNameChange={this.handleNameChange} />
          </Grid>
        </Grid>

        <InputDialog
          isOpen={isAddDialogOpen}
          dialogTitle='Add Tab'
          dialogContentText='Enter a name for the new tab'
          inputLabel='Name'
          dialogInput={tabName}
          onInputChange={this.handleChange}
          onDialogCancel={this.handleDialogCancel}
          onDialogConfirm={this.handleDialogAdd}
          confirmCaption='Add'
          errorOccured={errorOccured}
          errorMessage={errorMessage}
        />

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          dialogTitle='Delete Tab'
          dialogContentText={`Tab - ${deleteTabName}, will be deleted`}
          onDialogCancel={this.closeDeleteDialog}
          onDialogConfirm={this.handleDeleteConfirm}
        />

        <ConfigDialog
          isOpen={!!selectedTab}
          onClose={this.handleTabConfigDialogClose}
          tabName={tabName}
          onTabNameChange={this.handleTabNameChange}
          tabDescription={tabDescription}
          onTabDescriptionChange={this.handleTabDescriptionChange}
          tabIcon={tabIcon}
          onTabIconChange={this.handleTabIconChange}
          tabFilters={tabFilters}
          onTabFilterAdd={this.handleTabFilterAdd}
          onTabFiltersUpdate={this.handleTabFiltersUpdate}
          onTabFiltersDelete={this.handleTabFiltersDelete}
          tabWorkOrderButtons={tabWorkOrderButtons}
          onTabButtonAdd={this.handleTabButtonAdd}
          onTabButtonUpdate={this.handleTabButtonUpdate}
          onTabButtonsDelete={this.handleTabButtonsDelete}
          tabShowOperationIcon={tabShowOperationIcon}
          onTabShowOperationIconChange={this.handleTabShowOperationIconChange}
        />
      </React.Fragment >
    )
  }
}

NodeWidget.propTypes = {
  classes: PropTypes.object,
  node: PropTypes.any,
  toggleDiagramWidgetZoom: PropTypes.func
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDiagramWidgetZoom: enabled => {
      dispatch(ACTIONS.toggleDiagramWidgetZoom(enabled))
    }
  }
}

export default connect(null, mapDispatchToProps)(NodeWidget)
