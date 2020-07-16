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
	return new Logger(options)
}
