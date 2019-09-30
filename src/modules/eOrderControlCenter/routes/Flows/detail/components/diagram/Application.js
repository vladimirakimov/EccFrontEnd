import * as StormDiagram from 'storm-react-diagrams'

import NodeInstructionFactory from './nodes/buildingBlocks/NodeInstruction/NodeFactory'
import NodeInputFactory from './nodes/common/NodeInput/NodeFactory'

class Application {
  constructor () {
    this.diagramEngine = new StormDiagram.DiagramEngine()
    this.diagramEngine.installDefaultFactories()

    this.diagramEngine.registerNodeFactory(new NodeInstructionFactory())
    this.diagramEngine.registerNodeFactory(new NodeInputFactory())
    this.newModel()
  }

  newModel () {
    this.activeModel = new StormDiagram.DiagramModel()
    this.diagramEngine.setDiagramModel(this.activeModel)
  }

  getActiveDiagram () {
    return this.activeModel
  }

  getDiagramEngine () {
    return this.diagramEngine
  }
}

export default Application
