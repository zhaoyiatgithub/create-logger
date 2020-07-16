import { Logger } from './src/logger'

export function createLogger(options: {
	action?: {
		names: {
			[name: string]: {
				key?: string
				data?: {
					[name: string]: string | boolean | number
				}
			}
		}
		send: (key: string, data: object) => void
	}
	trace?: {
		names: {
			[name: string]: {
				key?: string
				data?: {
					[name: string]: string | boolean | number
				}
			}
		}
		send: (key: string, data: object) => void
	}
}) {
	return new Logger(formatOptions(options))
}

function formatOptions(options: {
	action?: {
		names: {
			[name: string]: {
				key?: string
				data?: {
					[name: string]: string | boolean | number
				}
			}
		}
		send: (key: string, data: object) => void
	}
	trace?: {
		names: {
			[name: string]: {
				key?: string
				data?: {
					[name: string]: string | boolean | number
				}
			}
		}
		send: (key: string, data: object) => void
	}
}) {
	Object.keys(options.action?.names || {}).forEach((_name) => {
		const _action = options.action?.names[_name] || {}
		if (!_action.data) {
			_action.data = {}
		}
		if (!_action.key) {
			_action.key = _name
		}
	})

	Object.keys(options.trace?.names || {}).forEach((_name) => {
		const _trace = options.trace?.names[_name] || {}
		if (!_trace.data) {
			_trace.data = {}
		}
		if (!_trace.key) {
			_trace.key = _name
		}
	})

	return options as {
		action?: {
			names: {
				[name: string]: {
					key: string
					data: {
						[name: string]: string | boolean | number
					}
				}
			}
			send: (key: string, data: object) => void
		}
		trace?: {
			names: {
				[name: string]: {
					key: string
					data: {
						[name: string]: string | boolean | number
					}
				}
			}
			send: (key: string, data: object) => void
		}
	}
}
