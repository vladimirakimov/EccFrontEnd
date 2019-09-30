import { NodeModel, DefaultPortModel } from 'storm-react-diagrams'

import { generateGuid } from '~/utils/guidGenerator'

class ListNodeModel extends NodeModel {
  constructor () {
    super('listscreen')
    this.addPort(new DefaultPortModel(true, 'input'))
    this.name = 'My List Screen'
    this.tabs = []
  }

  addTab (name) {
    const tab = {
      id: generateGuid(),
      name: name,
      description: '',
      icon: '',
      filters: [],
      workOrderButtons: [],
      showOperationIcon: false
    }
    this.tabs.push(tab)
  }

  removeTab (tab) {
    this.tabs = this.tabs.filter(x => x.id !== tab.id)
  }

  serialize () {
    return {
      ...super.serialize(),
      name: this.name,
      tabs: this.tabs
    }
  }

  deSerialize (data, engine) {
    super.deSerialize(data, engine)
    this.name = data.name
    this.tabs = data.tabs
  }
}

export default ListNodeModel
