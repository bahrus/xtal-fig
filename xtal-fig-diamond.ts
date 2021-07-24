import {define} from 'carbon-copy/c-c.js';
import {CCProps} from 'carbon-copy/types.d.js';
import {html} from 'xtal-element/lib/html.js';
import {XtalFigDiamondProps} from './types.d.js';
const mainTemplate = html`
<style>
    :host[hidden]{
        display:none;
    }
    :host{
        display:block;
    } 

</style>
<svg xmlns="http://www.w3.org/2000/svg" width={{width}} height={{height}}>
    <path part=para-fill 
        d={{path}} 
        style="fill:#ccff00;stroke:none" />
    <path part=para-border 
        d={{path}} 
        style="fill:none;stroke:#000000;stroke-width:{{strokeWidth}};stroke-linejoin:round;" />
    <g>
        <foreignObject part=inner width="{{innerWidth}}" height="{{innerHeight}}" x="{{innerX}}" y="{{innerY}}">
            <slot></slot>
        </foreignObject>
    </g>
    

</svg>
`;
type X = XtalFigDiamondProps;
/**
 * @element xtal-fig-diamond
 * @tag xtal-fig-diamond
 */
define('xtal-fig-diamond', mainTemplate, {
    numProps: ['width=800', 'height=300', 'innerWidth=200', 'strokeWidth=5', 'innerHeight=100', 'innerX=300', 'innerY=100'],
    stringProps:['path'],
    propActionsProp: [
        ({height, self}: X) => {
            self.style.height = height + 'px';
        },
        ({width, self}: X) => {
            self.style.width = width + 'px';
        },
        ({height, width, strokeWidth, self}: X) => {
            self.path = `M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height-strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`;
        },
    ],
} as CCProps);