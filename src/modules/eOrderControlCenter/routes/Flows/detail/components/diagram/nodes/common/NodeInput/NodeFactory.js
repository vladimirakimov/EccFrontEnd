import React from 'react'
import { AbstractNodeFactory } from 'storm-react-diagrams'

import NodeModel from './NodeModel'
import NodeWidget from './NodeWidget'

class InputNodeFactory extends AbstractNodeFactory {
  constructor () {
    super('input')
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

export default InputNodeFactory
