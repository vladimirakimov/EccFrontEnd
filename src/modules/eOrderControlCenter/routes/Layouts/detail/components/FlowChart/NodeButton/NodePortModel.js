import { PortModel, DefaultPortModel, DefaultLinkModel } from 'storm-react-diagrams'

class NodePortModel extends PortModel {
  constructor (name) {
    super(name, 'buttonport')
    this.description = ''
    this.image = ''
    this.filters = []
  }

  serialize () {
    return {
      ...super.serialize(),
      description: this.description,
      image: this.image,
      filters: this.filters
    }
  }

  deSerialize (data, engine) {
    super.deSerialize(data, engine)
    this.description = data.description
    this.image = data.image
    this.filters = data.filters
  }

  canLinkToPort (port) {
    if (port instanceof DefaultPortModel) {
      return port.in === true
    }

    return false
  }

  createLinkModel () {
    const link = super.createLinkModel()
    return link || new DefaultLinkModel()
  }
}

export default NodePortModel
