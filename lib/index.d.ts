import { Key } from './src/key'
export declare function createLogger<
	T extends {
		[name: string]: {
			key?: string
			data?: {
				[name: string]: string | boolean | number
			}
		}
	}
>(options: {
	names: T
	send: (key: string, data: object) => void
}): Record<
	keyof T,
	Key<{
		[name: string]: string | number | boolean
	}>
>
