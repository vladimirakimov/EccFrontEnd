import config from './modules/config'

class ModuleManager {
  constructor (config) {
    this.modules = [...config]
  }

  getModuleConfig (configName) {
    return this.modules.reduce((result, module) => {
      if (module[configName]) {
        return Object.assign({}, result, module[configName])
      }

      return result
    }, {})
  }
}

export default new ModuleManager(config)
