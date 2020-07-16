import { Logger } from './logger'

export function createLogger<
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
}) {
	return new Logger<A, T>(options)
}
