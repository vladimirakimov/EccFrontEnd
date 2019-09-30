import { AbstractPortFactory } from 'storm-react-diagrams'

class GenericPortFactory extends AbstractPortFactory {
  constructor (type, cb) {
    super(type)
    this.cb = cb
  }

  getNewInstance (initialConfig) {
    return this.cb(initialConfig)
  }
}

export default GenericPortFactory
