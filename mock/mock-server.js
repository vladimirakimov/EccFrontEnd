const jsonServer = require('json-server')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const enableDestroy = require('server-destroy')
const jph = require('json-parse-helpfulerror')

const source = path.join(__dirname, 'db.json')
const MOCK_SERVER_PORT = 3001

let instance
let router

function start (cb) {
  const server = jsonServer.create()
  const middlewares = jsonServer.defaults()
  router = jsonServer.router(source)

  server.use(middlewares)

  server.post('/teams/:id', function (req, res) {
    const db = router.db
    const team = db
      .get('teams')
      .find({ id: req.params.id })
      .value()

    res.jsonp(team)
  })

  server.post('/businessUnits/:id', function (req, res) {
    const db = router.db
    const businessUnit = db
      .get('businessUnits')
      .find({ name: req.params.name })
      .value()

    res.jsonp(businessUnit)
  })

  server.post('/sources/:source', function (req, res) {
    console.log(req)
    const db = router.db
    const source = db
      .get('sources')
      .find({ source: req.params.source })
      .value()

    res.jsonp(source)
  })

  server.use(router)
  instance = server.listen(MOCK_SERVER_PORT, () => console.log('Mock server is up and running!'))
  enableDestroy(instance)

  cb && cb()
}

start(() => {
  const watchedDir = path.dirname(source)
  fs.watch(watchedDir, (event, file) => {
    let obj

    try {
      obj = jph.parse(fs.readFileSync(source))
    } catch (e) {
      console.log('Error reading database file')

      return
    }

    const isDatabaseDifferent = !_.isEqual(obj, router.db.getState())

    if (isDatabaseDifferent) {
      console.log(`Database has changed, reloading...`)

      instance && instance.destroy()
      start()
    }
  })
})
