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
    <path part=para-fill 
        d={{fillPath}} 
        style="fill:#ccff00;stroke:none" />
    <path part=para-border 
        d={{borderPath}} 
        style="fill:none;stroke:#000000;stroke-width:{{strokeWidth}};stroke-linejoin:round;" />
    <g>
        <foreignObject part=inner width="{{innerWidth}}" height="{{innerHeight}}" x="{{innerX}}" y="{{innerY}}">
            <slot></slot>
        </foreignObject>
    </g>
    

</svg>
`;
/**
 * @element xtal-fig-parallelogram
 * @tag xtal-fig-parallelogram
 */
define('xtal-fig-parallelogram', mainTemplate, {
    numProps: ['topLeft', 'topRight', 'bottomRight', 'width=800', 'strokeWidth=5', 'height=300', 'slant=30',
        'innerWidth=200', 'innerHeight=100', 'innerX=300', 'innerY=100',],
    stringProps: ['fillPath', 'borderPath'],
    propActionsProp: [
        ({ width, strokeWidth, self }) => {
            self.topRight = width - strokeWidth;
            self.style.width = width + 'px';
        },
        ({ height, self }) => {
            self.style.height = height + 'px';
        },
        ({ height, strokeWidth, self }) => {
            self.heightMinusStroke = height - strokeWidth;
        },
        ({ slant, width, strokeWidth, self }) => {
            const hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
            self.topLeft = hOffset;
            self.bottomRight = width - hOffset;
        },
        ({ topLeft, strokeWidth, topRight, bottomRight, heightMinusStroke, self }) => {
            self.fillPath = `M ${topLeft},${strokeWidth} L ${topRight},${strokeWidth} L ${bottomRight},${heightMinusStroke} L ${strokeWidth},${heightMinusStroke} L ${topLeft},${strokeWidth} z`;
        },
        ({ topLeft, strokeWidth, topRight, bottomRight, heightMinusStroke, self }) => {
            self.borderPath = `M ${topLeft},${strokeWidth} L ${topRight},${strokeWidth} L ${bottomRight},${heightMinusStroke} L ${strokeWidth},${heightMinusStroke} L ${topLeft},${strokeWidth} z`;
        },
    ]
});
