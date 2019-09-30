import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { ACTIONS } from '../../../redux/layoutDetail.actions'
import InputDialog from '../../InputDialog'
import DeleteDialog from '../../DeleteDialog'
import ConfigDialog from '../../ScreensConfig/ButtonScreen/ConfigDialog'
import InputPortWidget from '../Common/InputPortWidget'
import NodeCard from './NodeCard'

class NodeWidget extends React.Component {
    state = {
      isAddButtonDialogOpen: false,
      isDeleteDialogOpen: false,
      dialogInput: '',
      buttonName: '',
      buttonDescription: '',
      buttonImage: '',
      buttonFilters: [],
      selectedButton: null,
      deleteButtonName: '',
      deleteButtonPort: null,
      errorOccured: false,
      errorMessage: ''
    }

    addButton = () => {
      this.setState({
        isAddButtonDialogOpen: true,
        dialogInput: ''
      })
    }

    closeAddButtonDialog = () => {
      this.setState({
        isAddButtonDialogOpen: false,
        errorOccured: false,
        errorMessage: ''
      })
    }

    handleAddButtonConfirm = () => {
      const { node } = this.props
      const { dialogInput } = this.state

      const buttons = Object.keys(node.ports)
        .filter(key => node.ports[key].type === 'buttonport')
        .map(button => button.toLowerCase())

      if (!buttons.includes(dialogInput.toLowerCase().trim())) {
        this.closeAddButtonDialog()
        node.addButtonPort(dialogInput)
        this.forceUpdate()
      } else {
        this.setState({
          errorOccured: true,
          errorMessage: 'Duplicated name'
        })
      }
    }

    deleteButton = (port) => {
      this.setState({
        isDeleteDialogOpen: true,
        deleteButtonPort: port,
        deleteButtonName: port.name
      })
    }

    closeDeleteDialog = () => {
      this.setState({
        isDeleteDialogOpen: false
      })
    }

    handleDeleteConfirm = () => {
      this.closeDeleteDialog()
      this.handleButtonDelete()
      this.setState({
        deleteButtonName: ''
      })
    }

    handleDialogInputChange = (e) => {
      this.setState({
        dialogInput: e.target.value
      })
    }

    handleNameChange = e => {
      const { node } = this.props
      node.name = e.target.value
      this.forceUpdate()
    }

    handleButtonDelete = () => {
      const { deleteButtonPort } = this.state
      const { node } = this.props
      const diagram = node.getParent()
      const links = deleteButtonPort.getLinks()
      for (const link in links) {
        diagram.removeLink(links[link])
      }
      node.removePort(deleteButtonPort)
      this.forceUpdate()
    }

    handleButtonClick = port => {
      const { node, toggleDiagramWidgetZoom } = this.props
      node.selected = false
      toggleDiagramWidgetZoom()

      this.setState({
        selectedButton: port,
        buttonName: port.name,
        buttonDescription: port.description,
        buttonImage: port.image,
        buttonFilters: port.filters
      })
    }

    handleButtonConfigDialogClose = () => {
      const { toggleDiagramWidgetZoom } = this.props
      const {
        selectedButton,
        buttonName,
        buttonDescription,
        buttonImage,
        buttonFilters
      } = this.state
      selectedButton.name = buttonName
      selectedButton.description = buttonDescription
      selectedButton.image = buttonImage
      selectedButton.filters = buttonFilters

      toggleDiagramWidgetZoom()
      this.forceUpdate()

      this.setState({
        selectedButton: null
      })
    }

    handleButtonNameChange = e => {
      this.setState({
        buttonName: e.target.value
      })
    }

    handleButtonDescriptionChange = e => {
      this.setState({
        buttonDescription: e.target.value
      })
    }

    handleButtonImageChange = e => {
      const file = e.target.files[0]
      const fileReader = new FileReader()

      fileReader.readAsDataURL(file)
      fileReader.onloadend = () => {
        this.setState({
          buttonImage: fileReader.result
        })
      }
    }

    handleButtonFilterAdd = newFilter => {
      const { buttonFilters } = this.state
      const filters = [
        ...buttonFilters,
        newFilter
      ]

      this.setState({
        buttonFilters: filters
      })
    }

    handleButtonFiltersUpdate = updatedFilter => {
      const { buttonFilters } = this.state
      const filters = [
        ...buttonFilters.filter(f => f.id !== updatedFilter.id),
        updatedFilter
      ]

      this.setState({
        buttonFilters: filters
      })
    }

    handleButtonFiltersDelete = ids => {
      const { buttonFilters } = this.state
      const remainedFilters = buttonFilters.filter(f => !ids.includes(f.id))

      this.setState({
        buttonFilters: remainedFilters
      })
    }

    render () {
      const { node } = this.props

      const {
        buttonName,
        deleteButtonName,
        buttonDescription,
        isAddButtonDialogOpen,
        isDeleteDialogOpen,
        selectedButton,
        buttonImage,
        buttonFilters,
        errorOccured,
        errorMessage,
        dialogInput
      } = this.state

      const inputPort = Object.keys(node.ports)
        .filter(key => node.ports[key].in === true)
        .map(key => node.ports[key])[0]
      const buttonPorts = Object.keys(node.ports)
        .filter(key => node.ports[key].type === 'buttonport')
        .map(key => node.ports[key])

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
                subheader='Button Screen'
                node={node}
                ports={buttonPorts}
                onButtonClick={this.handleButtonClick}
                onButtonDelete={this.deleteButton}
                onAddButtonClick={this.addButton}
                onRenameClick={this.renameScreen}
                onNameChange={this.handleNameChange}
              />
            </Grid>
          </Grid>

          <InputDialog
            isOpen={isAddButtonDialogOpen}
            dialogTitle='Add Button'
            dialogContentText='Enter a name for the new button'
            inputLabel='Name'
            dialogInput={dialogInput}
            onDialogCancel={this.closeAddButtonDialog}
            onDialogConfirm={this.handleAddButtonConfirm}
            onInputChange={this.handleDialogInputChange}
            confirmCaption='Add'
            errorOccured={errorOccured}
            errorMessage={errorMessage}
          />

          <DeleteDialog
            isOpen={isDeleteDialogOpen}
            dialogTitle='Delete Button'
            dialogContentText={`Button - ${deleteButtonName}, will be deleted`}
            onDialogCancel={this.closeDeleteDialog}
            onDialogConfirm={this.handleDeleteConfirm}
          />

          <ConfigDialog
            isOpen={!!selectedButton}
            onClose={this.handleButtonConfigDialogClose}
            buttonName={buttonName}
            onButtonNameChange={this.handleButtonNameChange}
            buttonDescription={buttonDescription}
            onButtonDescriptionChange={this.handleButtonDescriptionChange}
            buttonImage={buttonImage}
            onButtonImageChange={this.handleButtonImageChange}
            buttonFilters={buttonFilters}
            onButtonFilterAdd={this.handleButtonFilterAdd}
            onButtonFiltersUpdate={this.handleButtonFiltersUpdate}
            onButtonFiltersDelete={this.handleButtonFiltersDelete}
          />
        </React.Fragment>
      )
    }
}

NodeWidget.propTypes = {
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
