
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./supernova-exporter-css-like.cjs.production.min.js')
} else {
  module.exports = require('./supernova-exporter-css-like.cjs.development.js')
}
