'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Logger = void 0
const key_1 = require('./key')
class Logger {
	constructor(options) {
		const action = {}
		const trace = {}
		Object.keys(options.action.keys).forEach((_key) => {
			const _data = options.action.keys[_key]
			action[_key] = new key_1.Key({
				key: _key,
				data: _data,
				send: options.action.send,
			})
		})
		Object.keys(options.trace.keys).forEach((_key) => {
			const _data = options.action.keys[_key]
			trace[_key] = new key_1.Key({
				key: _key,
				data: _data,
				send: options.action.send,
			})
		})
		this.action = action
		this.trace = trace
	}
}
exports.Logger = Logger
