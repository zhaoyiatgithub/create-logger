import { Logger } from './src/class/logger'

type ActionMapType = {
	[name: string]: {
		[name: string]: string | boolean | number
	}
}
type TraceMapType = {
	[name: string]: {
		[name: string]: string | boolean | number
	}
}

function createLogger<
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
}) {
	return new Logger<A, T>(options)
}

export default { createLogger }
