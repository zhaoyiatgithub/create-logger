import { isSend, isData } from './verifys'
import { Key } from './key'

export class Logger<
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
	}) {
		const action: any = {}
		const trace: any = {}
		options.action &&
			options.action.names &&
			Object.keys(options.action.names).forEach((_key) => {
				const keyContent = options.action?.names[_key] || {}
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
			})

		options.trace &&
			options.trace.names &&
			Object.keys(options.trace.names).forEach((_key) => {
				const keyContent = options.trace?.names[_key] || {}
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
			})

		this.action = action
		this.trace = trace
	}
}
