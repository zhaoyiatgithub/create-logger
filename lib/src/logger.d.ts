import { Key } from './key'
export declare class Logger<
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
	constructor(options: {
		action?: {
			keys: A
			send: (key: string, data: any) => void
		}
		trace?: {
			keys: T
			send: (key: string, data: any) => void
		}
	})
}
