import { xc } from 'xtal-element/lib/XtalCore.js';
import { xp } from 'xtal-element/lib/XtalPattern.js';
import { html } from 'xtal-element/lib/html.js';
import { DOMKeyPEA } from 'xtal-element/lib/DOMKeyPEA.js';
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
const refs = { svgElement: '', pathElements: '', innerPart: '', paraBorderPart: '' };
/**
 * @element xtal-fig-parallelogram
 * @tag xtal-fig-parallelogram
 */
export class XtalFigParallelogram extends HTMLElement {
    static is = 'xtal-fig-parallelogram';
    self = this;
    propActions = propActions;
    refs = refs;
    mainTemplate = mainTemplate;
    reactor = new xp.RxSuppl(this, [{
            rhsType: Array,
            ctor: DOMKeyPEA,
        }]);
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs, {
            width: 800, strokeWidth: 5, height: 300, slant: 30,
            innerWidth: 200, innerHeight: 100, innerX: 300, innerY: 100,
        });
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
const propActions = [
    xp.manageMainTemplate,
    ({ width, height }) => [{
            [refs.svgElement]: [, , { width: width, height: height }]
        }],
    ({ slant, strokeWidth, width, height, self }) => {
        self.hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
    },
    ({ domCache, width, strokeWidth, height, slant, hOffset }) => [{
            [refs.pathElements]: [, , { d: `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z` }],
        }],
    ({ domCache, strokeWidth }) => [{
            [refs.paraBorderPart]: [{ style: { strokeWidth: strokeWidth } }],
        }],
    ({ domCache, innerHeight, innerWidth, innerX, innerY }) => [{
            [refs.innerPart]: [, , { width: innerWidth, height: innerHeight, x: innerX, y: innerY }],
        }],
    xp.createShadow,
];
const baseProp = {
    dry: true,
    async: true
};
const numProp = {
    ...baseProp,
    type: Number,
};
const propDefMap = {
    ...xp.props,
    width: numProp,
    height: numProp,
    innerWidth: numProp,
    strokeWidth: numProp,
    innerHeight: numProp,
    innerX: numProp,
    innerY: numProp,
    slant: numProp,
    hOffset: {
        ...numProp,
        stopReactionsIfFalsy: true,
    }
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalFigParallelogram, slicedPropDefs, 'onPropChange');
xc.define(XtalFigParallelogram);
