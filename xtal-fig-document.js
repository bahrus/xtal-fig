import { xc } from 'xtal-element/lib/XtalCore.js';
import { html } from 'xtal-element/lib/html.js';
import { xp } from 'xtal-element/lib/XtalPattern.js';
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
<svg width="102px"
    height="62px"  viewBox="-0.5 -0.5 102 62">
    <!-- <defs /> -->
    <g>
        <path
            d="M 96 1 C 98.76 1 101 3.24 101 6 L 101 53.5 Q 76 40 51 53.5 Q 26 67 1 53.5 L 1 8.5 L 1 6 C 1 3.24 3.24 1 6 1 Z"
            fill="#ffffff" stroke="#000000" stroke-width="2" stroke-miterlimit="10" pointer-events="none" />
    </g>
</svg>
<slot style="display:none"></slot>
<slot-bot></slot-bot>
<div part=inner class=inner ></div>
<style>
    .inner{
        position:relative;
        top:-50%;
        left:25%
    }
</style>
`;
const refs = { svgElement: '', innerPart: '', slotElement: '' };
//#region 
const baseProp = {
    dry: true,
    async: true,
};
const numProp = {
    ...baseProp,
    type: Number,
};
const boolProp0 = {
    ...baseProp,
    type: Boolean,
};
const boolProp1 = {
    ...boolProp0,
    stopReactionsIfFalsy: true,
};
const propDefMap = {
    ...xp.props,
    width: numProp,
    height: numProp,
};
export const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
//#endregion
/**
 * @element xtal-fig-document
 * @tag xtal-fig-document
 * @prop {number} [width=800] - Number of pixels wide the figure should be.
 * @attr {number} [width=800] - Number of pixels wide the figure should be.
 * @prop {number} [height=300] - Number of pixels high the figure should be.
 * @attr {number} [height=300] - Number of pixels high the figure should be.
 */
export class XtalFigDocument extends HTMLElement {
    static is = 'xtal-fig-document';
    static observedAttributes = [...slicedPropDefs.boolNames, ...slicedPropDefs.strNames, ...slicedPropDefs.numNames];
    refs = refs;
    propActions = propActions;
    attributeChangedCallback(n, ov, nv) {
        xc.passAttrToProp(this, slicedPropDefs, n, ov, nv);
    }
    self = this;
    reactor = new xp.RxSuppl(this, [{
            rhsType: Array,
            ctor: DOMKeyPEA,
        }]);
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
    mainTemplate = mainTemplate;
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs, {
            width: 800, height: 500,
        });
    }
}
const propActions = [
    xp.manageMainTemplate,
    ({ domCache, width, height }) => [
        { [refs.svgElement]: [, , { width, height }] },
        [{ style: { width: `${width}px`, height: `${height}px` } }]
    ],
    xp.createShadow,
];
xc.letThereBeProps(XtalFigDocument, slicedPropDefs, 'onPropChange');
xc.define(XtalFigDocument);
