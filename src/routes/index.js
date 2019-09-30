import ModuleManager from '../moduleManager'

const moduleRoutes = Object.keys(ModuleManager.getModuleConfig('routes')).map(item => {
  return ModuleManager.getModuleConfig('routes')[item]
})

const routes = [
  ...moduleRoutes
]

export default routes
