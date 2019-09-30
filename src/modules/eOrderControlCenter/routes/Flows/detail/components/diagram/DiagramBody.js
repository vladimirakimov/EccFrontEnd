import React from 'react'
import PropTypes from 'prop-types'
import { DiagramWidget } from 'storm-react-diagrams' // DiagramEngine, DiagramModeliagramEngine, DiagramModel
import SvgIcon from '@material-ui/core/SvgIcon'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import 'storm-react-diagrams/dist/style.min.css'
import DescriptionIcon from '@material-ui/icons/Description'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import AssignmentIcon from '@material-ui/icons/Assignment'
import InfoIcon from '@material-ui/icons/Info'
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import SpellcheckIcon from '@material-ui/icons/Spellcheck'
import LocalActivityIcon from '@material-ui/icons/LocalActivity'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import AssessmentIcon from '@material-ui/icons/Assessment'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

import Sidebar from './sidebar/Sidebar'
import SidebarList from './sidebar/SidebarList'
import SidebarItem from './sidebar/SidebarItem'
import NodeInstructionModel from './nodes/buildingBlocks/NodeInstruction/NodeModel'
import NodeInputModel from './nodes/common/NodeInput/NodeModel'

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

const svgIcons = {
  operators: <path d="M12,15C7.58,15 4,16.79 4,19V21H20V19C20,16.79 16.42,15 12,15M8,9A4,4 0 0,0 12,13A4,4 0 0,0 16,9M11.5,2C11.2,2 11,2.21 11,2.5V5.5H10V3C10,3 7.75,3.86 7.75,6.75C7.75,6.75 7,6.89 7,8H17C16.95,6.89 16.25,6.75 16.25,6.75C16.25,3.86 14,3 14,3V5.5H13V2.5C13,2.21 12.81,2 12.5,2H11.5Z" />,
  weight: <path d="M12,3A4,4 0 0,1 16,7C16,7.73 15.81,8.41 15.46,9H18C18.95,9 19.75,9.67 19.95,10.56C21.96,18.57 22,18.78 22,19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19C2,18.78 2.04,18.57 4.05,10.56C4.25,9.67 5.05,9 6,9H8.54C8.19,8.41 8,7.73 8,7A4,4 0 0,1 12,3M12,5A2,2 0 0,0 10,7A2,2 0 0,0 12,9A2,2 0 0,0 14,7A2,2 0 0,0 12,5Z" />,
  truckDelivery: <path d="M3,4A2,2 0 0,0 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8H17V4M10,6L14,10L10,14V11H4V9H10M17,9.5H19.5L21.47,12H17M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z" />,
  stockView: <path d="M20,20A2,2 0 0,1 18,22H4A2,2 0 0,1 2,20V6A2,2 0 0,1 4,4H9.5C9.2,4.8 9,5.6 9,6.5C9,10.1 11.9,13 15.5,13C16.3,13 17,12.9 17.6,12.6L20,15V20M19.3,8.9C19.7,8.2 20,7.4 20,6.5C20,4 18,2 15.5,2C13,2 11,4 11,6.5C11,9 13,11 15.5,11C16.4,11 17.2,10.7 17.9,10.3L21,13.4L22.4,12L19.3,8.9M15.5,9C14.1,9 13,7.9 13,6.5C13,5.1 14.1,4 15.5,4C16.9,4 18,5.1 18,6.5C18,7.9 16.9,9 15.5,9Z" />
}

class DiagramBody extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      showBuildingBlocks: true,
      showFreeActions: true
    }

    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.props.app.activeModel.addListener({
      linksUpdated: () => this.forceUpdate()
    })
  }

  handleSidebarBuildingBlockToggle = () => {
    this.setState(prevState => ({
      showBuildingBlocks: !prevState.showBuildingBlocks
    }))
  }
  handleSidebaFreeActionsToggle = () => {
    this.setState(prevState => ({
      showFreeActions: !prevState.showFreeActions
    }))
  }

  onDrop (event) {
    const { app } = this.props
    const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'))

    let node = null
    switch (data.type) {
      case 'instruction':
        node = new NodeInstructionModel()
        break
      case 'input':
        node = new NodeInputModel()
        break
      case 'inputFreeAction':
        node = new NodeInputModel()
        break
    }

    const diagram = app.getDiagramEngine().getDiagramModel()
    let buildingBlocksNodes = {}
    let freeActions = {}

    for (let key in diagram.nodes) {
      if (diagram.nodes[key].freeAction) {
        freeActions[key] = diagram.nodes[key]
      } else {
        buildingBlocksNodes[key] = diagram.nodes[key]
      }
    }

    if (!data.type.includes('FreeAction')) {
      const diagramNodes = Object.keys(buildingBlocksNodes)
      const diagramLastNode = buildingBlocksNodes[diagramNodes[diagramNodes.length - 1]]

      node.x = diagramLastNode ? diagramLastNode.x + 400 : 64
      node.y = 64
    } else {
      const diagramNodes = Object.keys(freeActions)
      const diagramLastNode = freeActions[diagramNodes[diagramNodes.length - 1]]
      node.locked = true
      node.freeAction = true

      node.x = diagramLastNode ? diagramLastNode.x + 350 : 91
      node.y = 512
    }

    console.log(diagram)

    diagram.addNode(node)
    this.forceUpdate()
  }

  onDragOver (event) {
    event.preventDefault()
  }

  render () {
    const { classes, app } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div
          className={classes.content}
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}>
          <Sidebar>
            <SidebarList
              title={'Building Blocks'}
              open={this.state.showBuildingBlocks}
              onSidebarToggle={this.handleSidebarBuildingBlockToggle}>
              <SidebarItem model={{ type: 'instruction' }} name="Instruction" icon={<DescriptionIcon />} />
              <SidebarItem model={{ type: 'input' }} name="Input" icon={<BorderColorIcon />} />
              <SidebarItem model={{ type: 'validation' }} name="Validation" icon={<CheckBoxIcon />} />
              <SidebarItem model={{ type: 'checklist' }} name="Checklist" icon={<AssignmentIcon />} />
              <SidebarItem model={{ type: 'information' }} name="Information" icon={<InfoIcon />} />
              <SidebarItem model={{ type: 'productHandling' }} name="Product Handling" icon={<DeveloperBoardIcon />} />
              <SidebarItem model={{ type: 'remarksInput' }} name="Remarks Input" icon={<SpellcheckIcon />} />
              <SidebarItem model={{ type: 'siloUnlock' }} name="Silo Unlock" icon={<LockOpenIcon />} />
              <SidebarItem model={{ type: 'extraActivities' }} name="Extra Activities" icon={<LocalActivityIcon />} />
              <SidebarItem model={{ type: 'operators' }} name="Operators" icon={<SvgIcon>{svgIcons.operators}</SvgIcon>} />
              <SidebarItem model={{ type: 'weight' }} name="Weight" icon={<SvgIcon>{svgIcons.weight}</SvgIcon>} />
              <SidebarItem model={{ type: 'summaryTransport' }} name="Summary Transport" icon={<LocalShippingIcon />} />
              <SidebarItem model={{ type: 'summaryMain' }} name="Summary Main" icon={<AssessmentIcon />} />
              <SidebarItem model={{ type: 'equipmentSelection' }} name="Equipment Selection" icon={<BusinessCenterIcon />} />
            </SidebarList>

            <SidebarList
              title={'Free Actions'}
              open={this.state.showFreeActions}
              onSidebarToggle={this.handleSidebaFreeActionsToggle}>
              <SidebarItem model={{ type: 'inputFreeAction' }} name="Input" icon={<BorderColorIcon />} />
              <SidebarItem model={{ type: 'checklist' }} name="Checklist" icon={<AssignmentIcon />} />
              <SidebarItem model={{ type: 'remarksInput' }} name="Remarks Input" icon={<SpellcheckIcon />} />
              <SidebarItem model={{ type: 'extraActivities' }} name="Extra Activities" icon={<LocalActivityIcon />} />
              <SidebarItem model={{ type: 'operators' }} name="Operators" icon={<SvgIcon>{svgIcons.operators}</SvgIcon>} />
              <SidebarItem model={{ type: 'weight' }} name="Weight" icon={<SvgIcon>{svgIcons.weight}</SvgIcon>} />
              <SidebarItem model={{ type: 'summaryTransport' }} name="Summary Transport" icon={<LocalShippingIcon />} />
              <SidebarItem model={{ type: 'summaryMain' }} name="Summary Main" icon={<AssessmentIcon />} />
              <SidebarItem model={{ type: 'equipmentSelection' }} name="Equipment Selection" icon={<BusinessCenterIcon />} />
              <SidebarItem model={{ type: 'takePicture' }} name="Take Picture" icon={<AddAPhotoIcon />} />
              <SidebarItem model={{ type: 'shiftGoods' }} name="Shift Goods" icon={<SvgIcon>{svgIcons.truckDelivery}</SvgIcon>} />
              <SidebarItem model={{ type: 'stockView' }} name="Stock View" icon={<SvgIcon>{svgIcons.stockView}</SvgIcon>} />
            </SidebarList>
          </Sidebar>
          <div className={classes.diagramLayer}>
            <DiagramWidget className={classes.diagramCanvas} diagramEngine={app.getDiagramEngine()} deleteKeys={[46]} />
          </div>
        </div>
      </div>
    )
  }
}

DiagramBody.propTypes = {
  classes: PropTypes.object,
  app: PropTypes.any
}

export default withStyles(styles)(DiagramBody)
