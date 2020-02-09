function createMemoryStorage () {
  const storage = {}

  async function set (key, value) {
    storage[key] = value
  }

  async function get (key) {
    return storage[key]
  }

  return {
    type: 'MEMORY',
    set,
    get
  }
}

module.exports = createMemoryStorage
