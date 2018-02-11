import { IEasyHTML, IHTMLElementConfig } from "./i-easy-html";

export let easyHTML: IEasyHTML = {
	svgns: 'http://www.w3.org/2000/svg',
	xlink: 'http://www.w3.org/1999/xlink',
	svgTags: [
		'svg',
		'use',
		'defs',
		'g',
		'path',
		'circle',
		'rect',
		'text',
		'filter',
		'image',
		'lineargradient',
		'radialgradient',
		'stop',
		'filter',
		'fegaussianblur',
		'foreignobject'
	],

    createElement: function (parameters: IHTMLElementConfig = {}): HTMLElement {
        let htmlElement: HTMLElement;

        if (typeof parameters.type !== 'string') {
            htmlElement = document.createElement('div');
        } else {
			let _type: string = parameters.type.toLowerCase();

			if (this.svgTags.includes(_type))
				htmlElement = document.createElementNS(this.svgns, parameters.type);
			else
				htmlElement = document.createElement(parameters.type);

        }

		if (parameters.parent.appendChild) {
			parameters.parent.appendChild(htmlElement);
		}

		if (parameters.innerHTML) {
			htmlElement.innerHTML = parameters.innerHTML;
		}

		let attr = parameters.attr;
		if (typeof attr === 'object') {
			for(let key in attr) {
				if (attr[key] === undefined) continue;

				switch (key) {
					case 'href':
						htmlElement.setAttributeNS( this.xlink, 'href', <string>attr['href'] );
						break;
					default:
						htmlElement.setAttribute( key, <string>attr[key] );
				}

			}

        }

        return htmlElement;
    }
};
