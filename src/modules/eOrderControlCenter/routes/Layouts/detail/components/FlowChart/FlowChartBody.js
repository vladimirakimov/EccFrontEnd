import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DnsIcon from '@material-ui/icons/Dns'
import ListIcon from '@material-ui/icons/List'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import ExtensionIcon from '@material-ui/icons/Extension'
import { DiagramWidget } from 'storm-react-diagrams'
import 'storm-react-diagrams/dist/style.min.css'

import DeleteDialog from '../DeleteDialog'
import TrayWidget from './TrayWidget'
import TrayItemWidget from './TrayItemWidget'

import NodeButtonModel from './NodeButton/NodeModel'
import NodeListModel from './NodeList/NodeModel'
import NodeMatrixModel from './NodeMatrix/NodeModel'
import NodeModuleModel from './NodeModule/NodeModel'

const styles = () => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  content: {
    display: 'flex',
    flexGrow: 1
  },
  diagramLayer: {
    position: 'relative',
    flexGrow: 1
  },
  diagramCanvas: {
    height: '100%',
    backgroundColor: '#3c3c3c',
    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
    backgroundSize: '50px 50px'
  }
})

class FlowChartBody extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      deleteKeys: [8, 46],
      selectedNodes: [],
      protectedNodes: [],
      protectedNodeTypes: ['buttonscreen', 'listscreen', 'matrixscreen', 'module'],
      deletingNodeName: '',
      isDeleteDialogOpen: false
    }
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.props.app.activeModel.addListener({
      linksUpdated: () => this.forceUpdate()
    })
  }

  onDrop (event) {
    const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'))

    let node = null
    switch (data.type) {
      case 'buttonscreen':
        node = new NodeButtonModel()
        break
      case 'listscreen':
        node = new NodeListModel()
        break
      case 'matrixscreen':
        node = new NodeMatrixModel()
        break
      case 'module':
        node = new NodeModuleModel()
        break
    }

    const points = this.props.app.getDiagramEngine().getRelativeMousePoint(event)
    const diagramModel = this.props.app.getDiagramEngine().getDiagramModel()
    node.x = points.x
    node.y = points.y
    diagramModel.addNode(node)
    this.forceUpdate()
  }

  onDragOver (event) {
    event.preventDefault()
  }

  componentDidMount () {
    window.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp (event) {
    const { deleteKeys, protectedNodeTypes } = this.state
    const selectedNodes = this.props.app.getDiagramEngine().getDiagramModel().getSelectedItems()
    const protectedNodes = selectedNodes.filter(item => {
      return protectedNodeTypes.includes(item.type)
    })
    this.setState({
      selectedNodes,
      protectedNodes
    })

    if (event.keyCode === 8) return false

    if (deleteKeys.indexOf(event.keyCode) !== -1) {
      if (protectedNodes.length) {
        this.setState({
          deletingNodeName: protectedNodes[0].name,
          isDeleteDialogOpen: true
        })
      } else {
        this.handleDeleteNodes(selectedNodes)
      }
    }
  }

  closeDeleteDialog = () => {
    this.setState({
      isDeleteDialogOpen: false
    })
  }

  handleDeleteNodes = (nodes) => {
    nodes.forEach(node => {
      if (!this.props.app.getDiagramEngine().isModelLocked(node)) {
        node.remove()
      }
    })

    this.forceUpdate()
  }

  handleDeleteConfirm = () => {
    const { protectedNodes } = this.state

    this.closeDeleteDialog()
    this.handleDeleteNodes(protectedNodes)
    this.setState({
      deletingNodeName: ''
    })
  }

  render () {
    const { classes, diagramWidgetZoom } = this.props
    const { deletingNodeName, isDeleteDialogOpen } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <TrayWidget>
            <TrayItemWidget model={{ type: 'buttonscreen' }} name="Buttons" icon={<DnsIcon />} />
            <TrayItemWidget model={{ type: 'listscreen' }} name="List" icon={<ListIcon />} />
            <TrayItemWidget model={{ type: 'matrixscreen' }} name="Matrix" icon={<ViewModuleIcon />} />
            <TrayItemWidget model={{ type: 'module' }} name="Module" icon={<ExtensionIcon />} />
          </TrayWidget>
          <div
            className={classes.diagramLayer}
            onDrop={this.onDrop}
            onDragOver={this.onDragOver}>
            <DiagramWidget
              className={classes.diagramCanvas}
              diagramEngine={this.props.app.getDiagramEngine()}
              deleteKeys={[]}
              allowCanvasZoom={diagramWidgetZoom}
            />
          </div>
        </div>

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          dialogTitle='Delete Node'
          dialogContentText={`Node - ${deletingNodeName}, will be deleted`}
          onDialogCancel={this.closeDeleteDialog}
          onDialogConfirm={this.handleDeleteConfirm}
        />
      </div>
    )
  }
}

FlowChartBody.propTypes = {
  classes: PropTypes.object,
  app: PropTypes.any,
  diagramWidgetZoom: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  diagramWidgetZoom: state.pages.layouts.layoutDetail.diagramWidgetZoom
})

export default withStyles(styles)(connect(mapStateToProps)(FlowChartBody))
