import { isData, isField, isSBNtype } from './verifys'

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
		this._data = options.data
		this._send = options.send
	}
	set(field: keyof T, value: string | boolean | number) {
		if (isField(field) && isSBNtype(value)) {
			this._data[field as keyof T] = value as any
		}
	}
	get(field: keyof T): string | boolean | number | undefined {
		if (isField(field)) {
			return this._data[field as keyof T]
		}
	}
	remove(field: keyof T) {
		if (isField(field)) {
			delete this._data[field as keyof T]
		}
	}
	setData(data: T) {
		if (isData(data)) {
			this._data = data
			return this._data
		}
	}
	getData(): T {
		return this._data
	}
	clear() {
		Object.keys(this._data).forEach((_key) => {
			this.remove(_key as keyof T)
		})
	}
	send(data?: T) {
		if (data && isData(data)) {
			this.clear()
			this._send(this.key, data)
		} else {
			let sendData = { ...this._data }
			this.clear()
			this._send(this.key, sendData)
		}
	}
}
