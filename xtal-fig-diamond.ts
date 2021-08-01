import {xc, IReactor, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {xp, XtalPattern} from 'xtal-element/lib/XtalPattern.js';
import {html} from 'xtal-element/lib/html.js';
import {XtalFigDiamondProps} from './types.js';
import {DOMKeyPEA} from 'xtal-element/lib/DOMKeyPEA.js';

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
const refs = {svgElement: '', pathElements: '', innerPart: '', diamondBorderPart: ''};

//#region props
const baseProp: PropDef = {
    dry: true,
    async: true,
};
const numProp: PropDef = {
    ...baseProp,
    type: Number,
}
const strProp: PropDef = {
    ...baseProp,
    type: String,
}
const propDefMap: PropDefMap<X> = {
    ...xp.props,
    width: numProp,
    height: numProp, 
    innerWidth: numProp, 
    strokeWidth: numProp, 
    innerHeight: numProp, 
    innerX: numProp, 
    innerY: numProp,
    //path: strProp,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
//#endregion
/**
 * @element xtal-fig-diamond
 * @tag xtal-fig-diamond
 * @csspart diamond-fill - path element that fills in the diamond
 * @csspart diamond-border - path element that adds a border to the diamond
 * @csspart inner = foreignObject element inside of which slot goes
 * @prop {number} [width=800] - Number of pixels wide the figure should be.
 * @attr {number} [width=800] - Number of pixels wide the figure should be.
 * @prop {number} [height=300] - Number of pixels high the figure should be.
 * @attr {number} [heigh=300] - Number of pixels high the figure should be.
 * @prop {number} [strokeWidth=5] - Width of border of figure.
 * @attr {number} [stroke-width=5] - Width of border of figure.
 * @prop {number} [innerX=300] - Number of pixels left edge of inner content should be set to.
 * @attr {number} [inner-x=300] - Number of pixels left edge of inner content should be set to.
 * @prop {number} [innerY=100] - Number of pixels top edge of inner content should be set to.
 * @attr {number} [inner-y=300] - Number of pixels top edge of inner content should be set to.
 * @prop {number} [innerWidth=200] - Number of pixels wide the inner content should be provided.
 * @attr {number} [inner-width=200] - Number of pixels wide the inner content should be provided.
 * @prop {number} [innerHeight=100] - Number of pixels high the inner content should be provided.
 * @attr {number} [inner-height=100] - Number of pixels high the inner content should be provided.
 *                     
 */
export class XtalFigDiamond extends HTMLElement implements ReactiveSurface, XtalPattern{
    static is = 'xtal-fig-diamond';
    static observedAttributes = [...slicedPropDefs.boolNames, ...slicedPropDefs.strNames, ...slicedPropDefs.numNames];
    attributeChangedCallback(n: string, ov: string, nv: string){
        xc.passAttrToProp(this, slicedPropDefs, n, ov, nv);
    }
    self = this;
    propActions = propActions;
    refs = refs;
    mainTemplate = mainTemplate;
    reactor: IReactor = new xp.RxSuppl(this, [{
        rhsType: Array,
        ctor: DOMKeyPEA,
    }]);
    connectedCallback(){
        xc.mergeProps<Partial<XtalFigDiamondProps>>(this, slicedPropDefs, {
            width:800, height:300, innerWidth:200, strokeWidth:5, innerHeight:100, innerX:300, innerY:100
        });
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
}
export interface XtalFigDiamond extends XtalFigDiamondProps{}
type X = XtalFigDiamond;
const propActions = [
    xp.manageMainTemplate,
    ({domCache, width, height}: X) => [
        {[refs.svgElement]: [,,{width, height}]},
        [{style:{width:`${width}px`, height:`${height}px`}}]
    ],
    ({domCache, width, strokeWidth, height}: X) => [{
        [refs.pathElements]:  [,, {d: `M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height-strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`,}],
    }],
    ({domCache, strokeWidth}: X) => [{
        [refs.diamondBorderPart]: [{style:{strokeWidth:strokeWidth}}],
    }],
    ({domCache, innerHeight, innerWidth, innerX, innerY}: X) => [{
        [refs.innerPart]: [,,{width: innerWidth, height: innerHeight, x: innerX, y: innerY}],
    }],
    xp.createShadow,
] as PropAction[];

xc.letThereBeProps(XtalFigDiamond, slicedPropDefs, 'onPropChange');
xc.define(XtalFigDiamond);