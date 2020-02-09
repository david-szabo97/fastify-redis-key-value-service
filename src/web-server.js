const createFastify = require('fastify')

function createWebServer (options) {
  const fastify = createFastify(options)

  fastify.get('/:key', async (req, res) => {
    const { key } = req.params

    const valueRaw = await this.storage.get(key)

    const value = JSON.parse(valueRaw)
    return value
  })

  fastify.post('/:key', async (req, res) => {
    const { key } = req.params
    const { body: valueRaw } = req

    const value = JSON.stringify(valueRaw)
    await this.storage.set(key, value)

    return { ok: true }
  })

  const start = async () => {
    const port = process.env.PORT || 3000
    const host = process.env.HOST || '0.0.0.0'

    try {
      await fastify.listen(port, host)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

  const setStorage = (storage) => {
    this.storage = storage
  }

  return {
    fastify,
    start,
    setStorage
  }
}

module.exports = createWebServer
