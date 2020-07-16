export declare class Key<
	T extends {
		[name: string]: string | boolean | number
	}
> {
	readonly key: string
	private _data
	private _send
	constructor(options: {
		key: string
		data: T
		send: (key: string, data: T) => void
	})
	set(field: string, value: string | boolean | number): void
	get(field: string): string | number | boolean | undefined
	remove(field: string): void
	setData(data: T): T | undefined
	getData(): T
	clear(): void
	send(): T
}
