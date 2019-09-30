import * as StormDiagram from 'storm-react-diagrams'

import NodeButtonFactory from './NodeButton/NodeFactory'
import NodeButtonPortModel from './NodeButton/NodePortModel'
import NodeListFactory from './NodeList/NodeFactory'
import NodeMatrixFactory from './NodeMatrix/NodeFactory'
import NodeModuleFactory from './NodeModule/NodeFactory'
import GenericPortFactory from './Common/GenericPortFactory'

class Application {
  constructor () {
    this.forceUpdate = null
    this.diagramEngine = new StormDiagram.DiagramEngine()
    this.diagramEngine.installDefaultFactories()

    this.diagramEngine.registerPortFactory(new GenericPortFactory('buttonport', config => new NodeButtonPortModel()))
    this.diagramEngine.registerNodeFactory(new NodeButtonFactory())
    this.diagramEngine.registerNodeFactory(new NodeListFactory())
    this.diagramEngine.registerNodeFactory(new NodeMatrixFactory())
    this.diagramEngine.registerNodeFactory(new NodeModuleFactory())

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
