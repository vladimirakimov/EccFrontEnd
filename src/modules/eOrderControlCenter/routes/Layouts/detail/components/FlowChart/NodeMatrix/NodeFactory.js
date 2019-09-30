import React from 'react'
import { AbstractNodeFactory } from 'storm-react-diagrams'

import NodeModel from './NodeModel'
import NodeWidget from './NodeWidget'

class MatrixScreenNodeFactory extends AbstractNodeFactory {
  constructor () {
    super('matrixscreen')
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

export default MatrixScreenNodeFactory
