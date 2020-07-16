import { Key } from './key'
declare type ActionMapType = {
	[name: string]: {
		[name: string]: string | boolean | number
	}
}
declare type TraceMapType = {
	[name: string]: {
		[name: string]: string | boolean | number
	}
}
export declare class Logger<A extends ActionMapType, T extends TraceMapType> {
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
export {}
