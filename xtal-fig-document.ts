import {xc, IReactor, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
//import {XtalFigBaseVBox, slicedPropDefs} from './xtal-fig-base-vbox-svg.js';
import {html} from 'xtal-element/lib/html.js';
import {xp, XtalPattern} from 'xtal-element/lib/XtalPattern.js';
import {DOMKeyPEA} from 'xtal-element/lib/DOMKeyPEA.js';
import {XtalFigDocumentProps} from './types.d.js';

const mainTemplate = html`
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
`;

const refs = {svgElement: '', innerPart: '', slotElement: ''};

//#region 
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
export class XtalFigDocument extends HTMLElement implements ReactiveSurface, XtalPattern{
    static is = 'xtal-fig-document';
    static observedAttributes = [...slicedPropDefs.boolNames, ...slicedPropDefs.strNames, ...slicedPropDefs.numNames];
    refs = refs;
    propActions = propActions;

    attributeChangedCallback(n: string, ov: string, nv: string){
        xc.passAttrToProp(this, slicedPropDefs, n, ov, nv);
    }
    self = this;
    reactor: IReactor = new xp.RxSuppl(this, [{
        rhsType: Array,
        ctor: DOMKeyPEA,
    }]);

    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
    mainTemplate = mainTemplate;
    connectedCallback(){
        xc.mergeProps<Partial<XtalFigDocumentProps>>(this, slicedPropDefs, {
            width: 800, height: 500, 
        });
    }
}
export interface XtalFigDocument extends XtalFigDocumentProps{}


type X = XtalFigDocument;

const propActions = [
    xp.manageMainTemplate,
    ({domCache, width, height}: X) => [
        {[refs.svgElement]: [,,{width, height}]},
        [{style:{width:`${width}px`, height:`${height}px`}}]
    ],
    xp.createShadow,
] as PropAction[];

xc.letThereBeProps(XtalFigDocument, slicedPropDefs, 'onPropChange');

xc.define(XtalFigDocument);

declare global {
    interface HTMLElementTagNameMap {
        "xtal-fig-document": XtalFigDocument,
    }
}