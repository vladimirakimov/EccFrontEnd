import { NodeModel, DefaultPortModel } from 'storm-react-diagrams'

class ModuleNodeModel extends NodeModel {
  constructor () {
    super('module')
    this.addPort(new DefaultPortModel(true, 'input'))
    this.name = 'My Module'
    this.moduleType = 'Stock View'
  }

  serialize () {
    return {
      ...super.serialize(),
      name: this.name,
      moduleType: this.moduleType
    }
  }

  deSerialize (data, engine) {
    super.deSerialize(data, engine)
    this.name = data.name
    this.moduleType = data.moduleType
  }
}

export default ModuleNodeModel
