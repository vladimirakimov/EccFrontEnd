import React from 'react'
import { AbstractNodeFactory } from 'storm-react-diagrams'

import NodeModel from './NodeModel'
import NodeWidget from './NodeWidget'

class ButtonScreenNodeFactory extends AbstractNodeFactory {
  constructor () {
    super('buttonscreen')
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

export default ButtonScreenNodeFactory
