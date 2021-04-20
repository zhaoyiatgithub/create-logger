'use strict'
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k]
					},
				})
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				o[k2] = m[k]
		  })
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, 'default', {
					enumerable: true,
					value: v,
				})
		  }
		: function (o, v) {
				o['default'] = v
		  })
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod
		var result = {}
		if (mod != null)
			for (var k in mod)
				if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k)
		__setModuleDefault(result, mod)
		return result
	}
Object.defineProperty(exports, '__esModule', { value: true })
exports.Key = void 0
const verifyUtil = __importStar(require('./verifyUtil'))
class Key {
	constructor(options) {
		this.key = options.key
		this._data = options.data
		this._send = options.send
	}
	set(field, value) {
		if (verifyUtil.isField(field) && verifyUtil.isSBNtype(value)) {
			this._data[field] = value
		}
	}
	get(field) {
		if (verifyUtil.isField(field)) {
			return this._data[field]
		}
	}
	remove(field) {
		if (verifyUtil.isField(field)) {
			delete this._data[field]
		}
	}
	setData(data) {
		if (verifyUtil.isData(data)) {
			this._data = data
			return this._data
		}
	}
	getData() {
		return { ...this._data }
	}
	clear() {
		Object.keys(this._data).forEach((_key) => {
			this.remove(_key)
		})
	}
	send(data) {
		if (data && verifyUtil.isData(data)) {
			this.clear()
			this._send(this.key, data)
		} else {
			let sendData = { ...this._data }
			this.clear()
			this._send(this.key, sendData)
		}
	}
}
exports.Key = Key
