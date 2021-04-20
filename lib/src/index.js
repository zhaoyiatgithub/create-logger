'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createLogger = void 0
const verifys_1 = require('./src/verifys')
const key_1 = require('./src/key')
function formatOptions(options) {
	for (const key in options.names) {
		if (Object.prototype.hasOwnProperty.call(options.names, key)) {
			const _element = verifys_1.isName(options.names[key])
				? options.names[key]
				: {}
			_element.key = _element.key || key
			_element.data =
				_element.data && verifys_1.isData(_element.data)
					? _element.data
					: {}
		}
	}
	return options
}
function createLoggerLegacy(options) {
	const _map = new Map()
	for (const key in options.names) {
		if (Object.prototype.hasOwnProperty.call(options.names, key)) {
			const element = options.names[key]
			_map.set(
				key,
				new key_1.Key({
					key: element.key,
					data:
						element.data && verifys_1.isData(element.data)
							? element.data
							: {},
					send:
						options.send && verifys_1.isSend(options.send)
							? options.send
							: () => {},
				})
			)
		}
	}
	return Object.fromEntries(_map)
}
function createLogger(options) {
	const _options = formatOptions(options)
	const _logger = createLoggerLegacy(_options)
	return _logger
}
exports.createLogger = createLogger
