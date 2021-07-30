import {xc, IReactor, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {xp, XtalPattern} from 'xtal-element/lib/XtalPattern.js';

import {XtalFigBaseVBoxProps} from './types.js';
import {DOMKeyPEA} from 'xtal-element/lib/DOMKeyPEA.js';

const refs = {svgElement: '', innerPart: '', slotElement: ''};

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
export class XtalFigBaseVBox extends HTMLElement implements ReactiveSurface, XtalPattern{
    self = this;
    propActions = propActions;
    refs = refs;
    reactor: IReactor = new xp.RxSuppl(this, [{
        rhsType: Array,
        ctor: DOMKeyPEA,
    }]);
    connectedCallback(){
        xc.mergeProps<Partial<XtalFigBaseVBoxProps>>(this, slicedPropDefs, {
            width: 800, height: 500, 
            innerX: 20, innerY: 20,
        });
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
}
export interface XtalFigBaseVBox extends XtalFigBaseVBoxProps{}
type X = XtalFigBaseVBox;
const propActions = [
    xp.manageMainTemplate,
    ({domCache, width, height}: X) => [
        {[refs.svgElement]: [,,{width, height}]},
        [{style:{width:`${width}px`, height:`${height}px`}}]
    ],
    ({domCache, innerX, innerY}: X) => [{
        [refs.innerPart]: [,,{x: innerX, y: innerY}],
    }],
    ({domCache, autoZoomSlot, width, height}: X) => [
        {[refs.slotElement]: [{style: {zoom: 62 / height}}]}
    ],
    xp.createShadow,
] as PropAction[];

const baseProp: PropDef = {
    dry: true,
    async: true,
};

const numProp: PropDef = {
    ...baseProp,
    type: Number,
};

const boolProp0: PropDef = {
    ...baseProp,
    type: Boolean,
};

const boolProp1: PropDef = {
    ...boolProp0,
    stopReactionsIfFalsy: true,
}

const propDefMap: PropDefMap<X> = {
    ...xp.props,
    width: numProp,
    height: numProp,
    innerX: numProp,
    innerY: numProp,
    autoZoomSlot: boolProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalFigBaseVBox, slicedPropDefs, 'onPropChange');

