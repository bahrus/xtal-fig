import { define } from 'carbon-copy/c-c.js';
import { html } from 'xtal-element/lib/html.js';
const mainTemplate = html `
<style>
    :host[hidden]{
        display:none;
    }
    :host{
        display:block;
    } 

</style>
<svg xmlns="http://www.w3.org/2000/svg" width={{width}} height={{height}}>
    <path part=diamond-fill 
        d={{path}} 
        style="fill:#ccff00;stroke:none" />
    <path part=diamond-border 
        d={{path}} 
        style="fill:none;stroke:#000000;stroke-width:{{strokeWidth}};stroke-linejoin:round;" />
    <g>
        <foreignObject part=inner width="{{innerWidth}}" height="{{innerHeight}}" x="{{innerX}}" y="{{innerY}}">
            <slot></slot>
        </foreignObject>
    </g>
    

</svg>
`;
/**
 * @element xtal-fig-diamond
 * @tag xtal-fig-diamond
 */
define('xtal-fig-diamond', mainTemplate, {
    numProps: ['width=800', 'height=300', 'innerWidth=200', 'strokeWidth=5', 'innerHeight=100', 'innerX=300', 'innerY=100'],
    stringProps: ['path'],
    propActionsProp: [
        ({ height, self }) => {
            self.style.height = height + 'px';
        },
        ({ width, self }) => {
            self.style.width = width + 'px';
        },
        ({ height, width, strokeWidth, self }) => {
            self.path = `M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height - strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`;
        },
    ],
});
