import { isString } from '../verifys'

export interface InterfaceKey<T> {
	key: string
	set: (field: string, value: string | boolean | number) => void
	get: (field: string) => void
	remove: (field: string) => void
	setData: (data: T) => T
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
		this.key = options.key
		this._data = options.data || ({} as T)
		this._send = options.send
	}
	set(field: string, value: string | boolean | number) {
		this._data[field as keyof T] = value as any
	}
	get(field: string) {
		if (isString(field)) {
			return this._data[field]
		} else {
			throw Error('')
		}
	}
	remove(field: string) {
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
			this._data[field as keyof T] = defaultValue as any
		}
	}
	setData(data: T) {
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
