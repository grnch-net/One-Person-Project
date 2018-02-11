export interface IEasyEvent {
	addEvent: IAddEvent
}

export interface IEventsList {
	[propName: string]: Function[]
}

interface IAddEvent {
	(
		element: HTMLElement | Window | HTMLDocument,
		type: string[] | string,
		callback: { [key: string]: any } | Function,
		useCapture?: boolean
	): void
}
