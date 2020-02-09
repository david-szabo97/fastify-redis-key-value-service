const createMemoryStorage = require('./memory')
const createRedisStorage = require('./redis')

function createStorage (type, options) {
  const typeUpper = type.toUpperCase()

  switch (typeUpper) {
    case 'MEMORY':
      return createMemoryStorage(options)
    case 'REDIS':
      return createRedisStorage({
        ...options,
        host: process.env.STORAGE_REDIS_HOST,
        port: process.env.STORAGE_REDIS_PORT
      })
    default:
      throw Error(`Unrecognized storage: ${typeUpper}`)
  }
}

module.exports = {
  createMemoryStorage,
  createRedisStorage,
  createStorage
}
