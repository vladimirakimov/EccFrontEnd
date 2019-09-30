import { NodeModel, DefaultPortModel } from 'storm-react-diagrams'

import NodePortModel from './NodePortModel'

class ButtonNodeModel extends NodeModel {
  constructor () {
    super('buttonscreen')
    this.addPort(new DefaultPortModel(true, 'input'))
    this.name = 'My Button Screen'
  }

  addButtonPort (name) {
    const portModel = new NodePortModel(name)
    portModel.maximumLinks = 1
    this.addPort(portModel)
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

export default ButtonNodeModel
