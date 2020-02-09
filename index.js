const createFastify = require('fastify')
const redis = require('redis')
const { promisify } = require('util')

// Web server
const fastify = createFastify({
  logger: true
})

fastify.get('/:key', async (req, res) => {
  const { key } = req.params
  const valueRaw = await clientGet(key)
  const value = JSON.parse(valueRaw)
  return value
})

fastify.post('/:key', async (req, res) => {
  const { key } = req.params
  const { body: valueRaw } = req
  const value = JSON.stringify(valueRaw)
  await clientSet(key, value)
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

start()

// Redis
const client = redis.createClient({
  host: 'redis',
  port: 6379
})
const clientGet = promisify(client.get).bind(client)
const clientSet = promisify(client.set).bind(client)

client.on('error', function (err) {
  fastify.log.error(err)
  process.exit(1)
})
