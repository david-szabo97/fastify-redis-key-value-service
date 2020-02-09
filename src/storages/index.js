const createMemoryStorage = require('./memory')
const createRedisStorage = require('./redis')

function createStorage (type, options) {
  const typeUpper = type.toUpperCase()

  switch (typeUpper) {
    case 'MEMORY':
      return createMemoryStorage(options)
    case 'REDIS':
      return createRedisStorage(options)
    default:
      throw Error(`Unrecognized storage: ${typeUpper}`)
  }
}

module.exports = {
  createMemoryStorage,
  createRedisStorage,
  createStorage
}
