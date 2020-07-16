'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createLogger = void 0
const logger_1 = require('./src/logger')
function createLogger(options) {
	return new logger_1.Logger(formatOptions(options))
}
exports.createLogger = createLogger
function formatOptions(options) {
	Object.keys(options.action?.names || {}).forEach((_name) => {
		const _action = options.action?.names[_name] || {}
		if (!_action.data) {
			_action.data = {}
		}
		if (!_action.key) {
			_action.key = _name
		}
	})
	Object.keys(options.trace?.names || {}).forEach((_name) => {
		const _trace = options.trace?.names[_name] || {}
		if (!_trace.data) {
			_trace.data = {}
		}
		if (!_trace.key) {
			_trace.key = _name
		}
	})
	return options
}
