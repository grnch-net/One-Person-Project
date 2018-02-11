export interface IEasyHTML {
	readonly svgns: string;
	readonly xlink: string;
	readonly svgTags: string[];

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
