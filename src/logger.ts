import { isSend, isData } from './verifys'
import { Key } from './key'

export class Logger<
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
	}) {
		const action: any = {}
		const trace: any = {}

		if (options.action && options.action.names) {
			Object.keys(options.action.names).forEach((_key) => {
				if (options.action) {
					const keyContent = options.action.names[_key]
					const { key, data } = keyContent
					action[_key] = new Key({
						key: key || _key,
						data: data && isData(data) ? data : {},
						send:
							options.action &&
							options.action.send &&
							isSend(options.action.send)
								? options.action.send
								: () => {},
					})
				}
			})
		}

		if (options.trace && options.trace.names) {
			Object.keys(options.trace.names).forEach((_key) => {
				if (options.trace) {
					const keyContent = options.trace.names[_key] || {}
					const { key, data } = keyContent
					trace[_key] = new Key({
						key: key || _key,
						data: data && isData(data) ? data : {},
						send:
							options.trace &&
							options.trace.send &&
							isSend(options.trace.send)
								? options.trace.send
								: () => {},
					})
				}
			})
		}

		this.action = action
		this.trace = trace
	}
}
