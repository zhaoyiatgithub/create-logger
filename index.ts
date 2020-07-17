import { isName, isData, isSend } from './src/verifys'
import { Key } from './src/key'

function formatOptions<
	T extends {
		[name: string]: {
			key?: string
			data?: {
				[name: string]: string | boolean | number
			}
		}
	}
>(options: { names: T; send: (key: string, data: object) => void }) {
	for (const key in options.names) {
		if (Object.prototype.hasOwnProperty.call(options.names, key)) {
			const _element = isName(options.names[key])
				? options.names[key]
				: ({} as T)
			_element.key = _element.key || key
			_element.data =
				_element.data && isData(_element.data) ? _element.data : {}
		}
	}

	return options as {
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

function createLoggerLegacy<
	T extends {
		[name: string]: {
			key: string
			data: {
				[name: string]: string | boolean | number
			}
		}
	}
>(options: {
	names: T
	send: (key: string, data: object) => void
}): Record<keyof T, Key<T[keyof T]['data']>> {
	const _map = new Map<keyof T, Key<T[keyof T]['data']>>()

	for (const key in options.names) {
		if (Object.prototype.hasOwnProperty.call(options.names, key)) {
			const element = options.names[key]
			_map.set(
				key,
				new Key({
					key: element.key,
					data:
						element.data && isData(element.data)
							? element.data
							: {},
					send:
						options.send && isSend(options.send)
							? options.send
							: () => {},
				})
			)
		}
	}

	return Object.fromEntries(_map) as Record<keyof T, Key<T[keyof T]['data']>>
}

export function createLogger<
	T extends {
		[name: string]: {
			key?: string
			data?: {
				[name: string]: string | boolean | number
			}
		}
	}
>(options: { names: T; send: (key: string, data: object) => void }) {
	const _options = formatOptions(options)
	const _logger = createLoggerLegacy(_options)

	type TT = typeof _options['names']
	return _logger as Record<keyof T, Key<TT[keyof TT]['data']>>
}
