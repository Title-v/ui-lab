const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 1600,
  e2e: {},
})
