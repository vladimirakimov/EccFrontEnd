import React from 'react'
import { AbstractNodeFactory } from 'storm-react-diagrams'

import NodeModel from './NodeModel'
import NodeWidget from './NodeWidget'

class NodeFactory extends AbstractNodeFactory {
  constructor () {
    super('module')
  }

  generateReactWidget (diagramEngine, node) {
    return (
      <NodeWidget node={node} />
    )
  }

  getNewInstance () {
    return new NodeModel()
  }
}

export default NodeFactory
