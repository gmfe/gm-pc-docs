const nodeResolver = require('eslint-import-resolver-node')

function getConfigValue(source, config) {
  for (const key in config) {
    if (source.startsWith(key)) {
      return config[key] + source.slice(key.length)
    }
  }
}

function resolve(source, file, config) {
  const p = getConfigValue(source, config)
  if (p) {
    return nodeResolver.resolve(p, file, config)
  }

  return nodeResolver.resolve(source, file, config)
}

module.exports = {
  interfaceVersion: 2,
  resolve
}
