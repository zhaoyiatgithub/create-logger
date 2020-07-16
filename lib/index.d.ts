import { Logger } from './src/logger'
export declare function createLogger(options: {
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
}): Logger<
	{
		[name: string]: {
			key: string
			data: {
				[name: string]: string | number | boolean
			}
		}
	},
	{
		[name: string]: {
			key: string
			data: {
				[name: string]: string | number | boolean
			}
		}
	}
>
