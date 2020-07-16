import { Key } from './key'
export declare class Logger<
	D extends {
		[name: string]: string | boolean | number
	},
	A extends {
		[name: string]: {
			key?: string
			data?: D
		}
	},
	T extends {
		[name: string]: {
			key?: string
			data?: D
		}
	}
> {
	readonly action: Record<keyof A, Key<D>>
	readonly trace: Record<keyof T, Key<D>>
	constructor(options: {
		action?: {
			names: A
			send: (key: string, data: any) => void
		}
		trace?: {
			names: T
			send: (key: string, data: any) => void
		}
	})
}
