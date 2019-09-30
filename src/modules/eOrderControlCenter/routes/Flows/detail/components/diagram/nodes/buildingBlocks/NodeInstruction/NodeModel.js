import { NodeModel, DefaultPortModel } from 'storm-react-diagrams'

class InstructionModel extends NodeModel {
  constructor () {
    super('instruction')
    this.name = 'Instruction Name'

    this.addPort(new DefaultPortModel(true, 'input'))
    this.addPort(new DefaultPortModel(false, 'output'))
  }

  serialize () {
    return {
      ...super.serialize(),
      name: this.name
    }
  }

  deSerialize (data, engine) {
    super.deSerialize(data, engine)
    this.name = data.name
  }
}

export default InstructionModel
