const redis = require('redis')
const { promisify } = require('util')

function createRedisStorage ({ logger }) {
  const client = redis.createClient({
    host: 'redis',
    port: 6379
  })

  client.asyncGet = promisify(client.get).bind(client)
  client.asyncSet = promisify(client.set).bind(client)

  client.on('error', function (err) {
    logger.error(err)
    process.exit(1)
  })

  const set = (key, value) => client.asyncSet(key, value)
  const get = (key) => client.asyncGet(key)

  return {
    type: 'REDIS',
    set,
    get
  }
}

module.exports = createRedisStorage
