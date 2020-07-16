import { Logger } from './src/class/logger'
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
export declare function createLogger<
	A extends ActionMapType,
	T extends TraceMapType
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
export {}
