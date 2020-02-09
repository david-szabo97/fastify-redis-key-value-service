const createWebServer = require('./web-server')
const { createStorage } = require('./storages')

const webServer = createWebServer({ logger: true })

async function start () {
  await webServer.start()

  const storageOptions = { logger: webServer.fastify.log }
  const storage = createStorage(process.env.STORAGE || 'memory', storageOptions)
  webServer.setStorage(storage)

  webServer.fastify.log.info(`Using storage: ${storage.type}`)
}

start()
