declare class Key<T> {
	key: string
	set: (field: string, value: string | boolean | number) => void
	get: (field: string) => void
	remove: (field: string) => void
	setData: (data: T) => T | undefined
	getData: () => T
	clear: () => void
	send: () => void
}

declare class Logger<
	A extends {
		[name: string]: {
			[name: string]: string | boolean | number
		}
	},
	T extends {
		[name: string]: {
			[name: string]: string | boolean | number
		}
	}
> {
	readonly action: Record<keyof A, Key<A[keyof A]>>
	readonly trace: Record<keyof T, Key<T[keyof T]>>
}

declare function createLogger<
	A extends {
		[name: string]: {
			[name: string]: string | boolean | number
		}
	},
	T extends {
		[name: string]: {
			[name: string]: string | boolean | number
		}
	}
>(options: {
	action?: {
		keys: A
		send: (key: string, data: any) => void
	}
	trace?: {
		keys: T
		send: (key: string, data: any) => void
	}
}): Logger<A, T>