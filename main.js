'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const logger_1 = require('./src/class/logger')
function createLogger(options) {
	return new logger_1.Logger(options)
}
exports.default = { createLogger }
