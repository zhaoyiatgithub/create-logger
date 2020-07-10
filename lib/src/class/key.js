'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Key = void 0
const verifys_1 = require('../verifys')
class Key {
	constructor(options) {
		this.key = options.key
		this._data = options.data || {}
		this._send = options.send
	}
	set(field, value) {
		this._data[field] = value
	}
	get(field) {
		if (verifys_1.isString(field)) {
			return this._data[field]
		} else {
			throw Error('')
		}
	}
	remove(field) {
		let defaultValue
		if (this._data[field]) {
			switch (typeof this._data[field]) {
				case 'string':
					defaultValue = ''
					break
				case 'number':
					defaultValue = 0
					break
				case 'boolean':
					defaultValue = false
					break
				default:
					break
			}
			this._data[field] = defaultValue
		}
	}
	setData(data) {
		this._data = data
		return this._data
	}
	getData() {
		return this._data
	}
	clear() {
		Object.keys(this._data).forEach((_key) => {
			this.remove(_key)
		})
	}
	send() {
		this._send(this.key, this._data)
		this.clear()
	}
}
exports.Key = Key
