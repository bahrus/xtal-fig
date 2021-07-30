import { xc } from 'xtal-element/lib/XtalCore.js';
import { xp } from 'xtal-element/lib/XtalPattern.js';
import { DOMKeyPEA } from 'xtal-element/lib/DOMKeyPEA.js';
const refs = { svgElement: '', innerPart: '', slotElement: '' };
/**
 * @element xtal-fig-document
 * @tag xtal-fig-document
 * @prop {number} [width=800] - Number of pixels wide the figure should be.
 * @attr {number} [width=800] - Number of pixels wide the figure should be.
 * @prop {number} [height=300] - Number of pixels high the figure should be.
 * @attr {number} [heigh=300] - Number of pixels high the figure should be.
 * @prop {number} [innerX=300] - Number of pixels left edge of inner content should be set to.
 * @attr {number} [inner-x=300] - Number of pixels left edge of inner content should be set to.
 * @prop {number} [innerY=100] - Number of pixels top edge of inner content should be set to.
 * @attr {number} [inner-y=300] - Number of pixels top edge of inner content should be set to.
 * @prop {boolean} [autoZoomSlot] - Counter balance the zoom effect of resizing the component for the inner content.
 * @attr {boolean} [auto-zoom-slot] - Counter balance the zoom effect of resizing the component for the inner content.
 */
export class XtalFigBaseVBox extends HTMLElement {
    self = this;
    propActions = propActions;
    refs = refs;
    reactor = new xp.RxSuppl(this, [{
            rhsType: Array,
            ctor: DOMKeyPEA,
        }]);
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs, {
            width: 800, height: 500,
            innerX: 20, innerY: 20,
        });
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
const propActions = [
    xp.manageMainTemplate,
    ({ domCache, width, height }) => [
        { [refs.svgElement]: [, , { width, height }] },
        [{ style: { width: `${width}px`, height: `${height}px` } }]
    ],
    ({ domCache, innerX, innerY }) => [{
            [refs.innerPart]: [, , { x: innerX, y: innerY }],
        }],
    ({ domCache, autoZoomSlot, width, height }) => [
        { [refs.slotElement]: [{ style: { zoom: 62 / height } }] }
    ],
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
    innerX: numProp,
    innerY: numProp,
    autoZoomSlot: boolProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalFigBaseVBox, slicedPropDefs, 'onPropChange');
