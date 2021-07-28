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
    <path part=diamond-fill 
        style="fill:#ccff00;stroke:none" />
    <path part=diamond-border 
        style="fill:none;stroke:#000000;stroke-linejoin:round;" />
    <g>
        <foreignObject part=inner>
            <slot></slot>
        </foreignObject>
    </g>
</svg>
`;
const refs = { svgElement: '', pathElements: '', innerPart: '', diamondBorderPart: '' };
export class XtalFigDiamond extends HTMLElement {
    static is = 'xtal-fig-diamond';
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
            width: 800, height: 300, innerWidth: 200, strokeWidth: 5, innerHeight: 100, innerX: 300, innerY: 100
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
    ({ domCache, width, strokeWidth, height }) => [{
            [refs.pathElements]: [, , { d: `M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height - strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`, }],
        }],
    ({ domCache, strokeWidth }) => [{
            [refs.diamondBorderPart]: [{ style: { strokeWidth: strokeWidth } }],
        }],
    ({ domCache, innerHeight, innerWidth, innerX, innerY }) => [{
            [refs.innerPart]: [, , { width: innerWidth, height: innerHeight, x: innerX, y: innerY }],
        }],
    xp.createShadow,
];
const baseProp = {
    dry: true,
    async: true,
};
const numProp = {
    ...baseProp,
    type: Number,
};
const strProp = {
    ...baseProp,
    type: String,
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
    path: strProp,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalFigDiamond, slicedPropDefs, 'onPropChange');
xc.define(XtalFigDiamond);
