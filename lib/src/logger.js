'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Logger = void 0
const verifys_1 = require('./verifys')
const key_1 = require('./key')
class Logger {
	constructor(options) {
		const action = {}
		const trace = {}
		options.action &&
			options.action.names &&
			Object.keys(options.action.names).forEach((_key) => {
				const keyContent = options.action?.names[_key] || {}
				const { key, data } = keyContent
				action[_key] = new key_1.Key({
					key: key || _key,
					data: data && verifys_1.isData(data) ? data : {},
					send:
						options.action &&
						options.action.send &&
						verifys_1.isSend(options.action.send)
							? options.action.send
							: () => {},
				})
			})
		options.trace &&
			options.trace.names &&
			Object.keys(options.trace.names).forEach((_key) => {
				const keyContent = options.trace?.names[_key] || {}
				const { key, data } = keyContent
				trace[_key] = new key_1.Key({
					key: key || _key,
					data: data && verifys_1.isData(data) ? data : {},
					send:
						options.trace &&
						options.trace.send &&
						verifys_1.isSend(options.trace.send)
							? options.trace.send
							: () => {},
				})
			})
		this.action = action
		this.trace = trace
	}
}
exports.Logger = Logger
