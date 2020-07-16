'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createLogger = void 0
const logger_1 = require('./logger')
function createLogger(options) {
	return new logger_1.Logger(options)
}
exports.createLogger = createLogger
