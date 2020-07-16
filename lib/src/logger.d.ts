import { Key } from './key'
export declare class Logger<
	A extends {
		[name: string]: {
			key: string
			data: {
				[name: string]: string | boolean | number
			}
		}
	},
	T extends {
		[name: string]: {
			key: string
			data: {
				[name: string]: string | boolean | number
			}
		}
	}
> {
	readonly action: Record<keyof A, Key<A[keyof A]['data']>>
	readonly trace: Record<keyof T, Key<T[keyof T]['data']>>
	constructor(options: {
		action?: {
			names: A
			send: (key: string, data: object) => void
		}
		trace?: {
			names: T
			send: (key: string, data: object) => void
		}
	})
}
