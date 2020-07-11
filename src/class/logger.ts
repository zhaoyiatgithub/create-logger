import { ActionMapType, TraceMapType } from '../../main'
import { Key } from './key'

export class Logger<A extends ActionMapType, T extends TraceMapType> {
	readonly action: Record<keyof A, Key<A[keyof A]>>
	readonly trace: Record<keyof T, Key<T[keyof T]>>
	constructor(options: {
		action: {
			keys: A
			send: (key: string, data: any) => void
		}
		trace: {
			keys: T
			send: (key: string, data: any) => void
		}
	}) {
		const action: any = {}
		const trace: any = {}
		Object.keys(options.action.keys).forEach((_key) => {
			action[_key] = new Key({
				key: _key,
				data: options.action.keys[_key],
				send: options.action.send,
			})
		})
		Object.keys(options.trace.keys).forEach((_key) => {
			trace[_key] = new Key({
				key: _key,
				data: options.action.keys[_key],
				send: options.action.send,
			})
		})

		this.action = action as Record<keyof A, Key<A[keyof A]>>
		this.trace = trace as Record<keyof T, Key<T[keyof T]>>
	}
}
