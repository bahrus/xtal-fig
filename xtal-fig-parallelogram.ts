import {define} from 'carbon-copy/c-c.js';
import {CCProps} from 'carbon-copy/types.d.js';
import {html} from 'xtal-element/lib/html.js';
import {XtalFigParallelogramProps} from './types.d.js';

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
type X = XtalFigParallelogramProps;
/**
 * @element xtal-fig-parallelogram
 * @tag xtal-fig-parallelogram
 */
define('xtal-fig-parallelogram', mainTemplate, {
    numProps:['width=800', 'strokeWidth=5', 'height=300', 'slant=30', 
    'innerWidth=200', 'innerHeight=100', 'innerX=300', 'innerY=100', ],
    stringProps:['path'],
    propActionsProp:[
        ({width, self}: X) => {
            self.style.width = width + 'px';
        },
        ({height, self}: X) => {
            self.style.height = height + 'px';
        },
        // ({height, strokeWidth, self}: X) => {
        //     self.heightMinusStroke = height - strokeWidth;
        // },
        ({slant, strokeWidth, width, height, self}: X) => {
            const hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
            self.path = `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z`;
        },

    ]
} as CCProps);