import { NodeModel, DefaultPortModel } from 'storm-react-diagrams'

class InstructionModel extends NodeModel {
  constructor () {
    super('input')
    this.name = 'Input Name'
    this.freeAction = false

    this.addPort(new DefaultPortModel(true, 'input'))
    this.addPort(new DefaultPortModel(false, 'output'))
  }
}

export default InstructionModel
