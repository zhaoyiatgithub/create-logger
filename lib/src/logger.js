'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Logger = void 0
const key_1 = require('./key')
class Logger {
	constructor(options) {
		const action = {}
		const trace = {}
		options.action &&
			options.action.keys &&
			Object.keys(options.action.keys).forEach((_key) => {
				action[_key] = new key_1.Key({
					key: _key,
					data: options.action ? options.action.keys[_key] : {},
					send: options.action ? options.action.send : () => {},
				})
			})
		options.trace &&
			options.trace.keys &&
			Object.keys(options.trace.keys).forEach((_key) => {
				trace[_key] = new key_1.Key({
					key: _key,
					data: options.trace ? options.trace.keys[_key] : {},
					send: options.trace ? options.trace.send : () => {},
				})
			})
		this.action = action
		this.trace = trace
	}
}
exports.Logger = Logger
