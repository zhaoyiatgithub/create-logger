import { isKeyData, isSend, isField, isSBNtype } from '../function/verifys'

export class Key<
	T extends {
		[name: string]: string | boolean | number
	}
> {
	readonly key: string
	private _data: T
	private _send: (key: string, data: T) => void

	constructor(options: {
		key: string
		data: T
		send: (key: string, data: T) => void
	}) {
		this.key = options.key
		this._data = isKeyData(options.data) ? options.data : ({} as T)
		this._send = isSend(options.send) ? options.send : () => {}
	}
	set(field: string, value: string | boolean | number) {
		if (isField(field) && isSBNtype(value)) {
			this._data[field as keyof T] = value as any
		}
	}
	get(field: string) {
		if (isField(field)) {
			return this._data[field]
		}
	}
	remove(field: string) {
		if (isField(field) && this._data[field]) {
			delete this._data[field]
		}
	}
	setData(data: T) {
		if (isKeyData(data)) {
			this._data = data
			return this._data
		}
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
		let sendData = { ...this._data }
		this._send(this.key, sendData)
		this.clear()
		return sendData
	}
}
