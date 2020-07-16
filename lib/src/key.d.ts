export declare class Key<T> {
	readonly key: string
	private _data
	private _send
	constructor(options: {
		key: string
		data: T
		send: (key: string, data: T) => void
	})
	set(field: keyof T, value: string | boolean | number): void
	get(field: keyof T): T[keyof T] | undefined
	remove(field: keyof T): void
	setData(data: T): T | undefined
	getData(): T
	clear(): void
	send(data?: T): void
}
