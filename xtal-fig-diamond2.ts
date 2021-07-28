import {xc, IReactor, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {xp, XtalPattern} from 'xtal-element/lib/XtalPattern.js';
import {html} from 'xtal-element/lib/html.js';
import {XtalFigDiamondProps} from './types.d.js';
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
const refs = {pathElements: '', innerPart: '', diamondBorderPart: ''};
export class XtalFigDiamond extends HTMLElement implements ReactiveSurface, XtalPattern{
    static is = 'xtal-fig-diamond';
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
    path: strProp,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalFigDiamond, slicedPropDefs, 'onPropChange');
xc.define(XtalFigDiamond);