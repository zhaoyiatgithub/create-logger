import { isKey, isKeyData, isSend, isField, isSBNtype } from '../verifys'

export interface InterfaceKey<T> {
	key: string
	set: (field: string, value: string | boolean | number) => void
	get: (field: string) => void
	remove: (field: string) => void
	setData: (data: T) => T | undefined
	getData: () => T
	clear: () => void
	send: () => void
}

export class Key<
	T extends {
		[name: string]: string | boolean | number
	}
> implements InterfaceKey<T> {
	readonly key: string
	private _data: T
	private _send: (key: string, data: T) => void

	constructor(options: {
		key: string
		data: T
		send: (key: string, data: T) => void
	}) {
		this.key = isKey(options.key) ? options.key : ''
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
			this._data[field]
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
		this._send(this.key, this._data)
		this.clear()
	}
}
