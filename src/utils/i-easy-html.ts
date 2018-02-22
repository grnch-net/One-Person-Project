export interface IEasyHTML {
	readonly svgns: string;
	readonly xlink: string;
	readonly svgTags: string[];

	attr(element: HTMLElement, parameters?: any): any;
	createElement(parameters?: IHTMLElementConfig): HTMLElement;
}

export interface IHTMLElementConfig {
	type?: string,
	parent?: HTMLElement,
	innerHTML?: string,
	attr?: {
		[key: string]: string | number;
	},
}
