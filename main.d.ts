declare function createLogger(name: string): void

declare type ActionKeyMapType = {
	[name: string]: string
}
declare type TraceKeyMapType = {
	[name: string]: string
}

declare interface Options<
	A extends ActionKeyMapType,
	T extends TraceKeyMapType
> {
	keyMap: {
		action: A
		trace: T
	}
	sendAction: (key: string, data: object) => void
	sendTrace: (key: string, data: object) => void
}
