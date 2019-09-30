import { NodeModel, DefaultPortModel } from 'storm-react-diagrams'

class MatrixNodeModel extends NodeModel {
  constructor () {
    super('matrixscreen')
    this.addPort(new DefaultPortModel(true, 'input'))
  }
}

export default MatrixNodeModel
