import {xc, IReactor, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {xp, XtalPattern} from 'xtal-element/lib/XtalPattern.js';
import {html} from 'xtal-element/lib/html.js';
import {XtalFigParallelogramProps} from './types.js';
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

const refs = {svgElement: '', pathElements: '', innerPart: '', paraBorderPart: ''};

//#region 
const baseProp: PropDef = {
    dry: true,
    async: true
};
const numProp: PropDef = {
    ...baseProp,
    type: Number,
};
const propDefMap: PropDefMap<X> = {
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
//#endregion

/**
 * @element xtal-fig-parallelogram
 * @tag xtal-fig-parallelogram
 * @csspart para-fill - path element that fills in the parallelogram
 * @csspart para-border - path element that provides border for parallelogram
 * @csspart inner - foreignObject that hosts the inner slot content
 * @prop {number} [width=800] - Number of pixels wide the figure should be.
 * @attr {number} [width=800] - Number of pixels wide the figure should be.
 * @prop {number} [height=300] - Number of pixels high the figure should be.
 * @attr {number} [heigh=300] - Number of pixels high the figure should be.
 * @prop {number} [strokeWidth=5] - Width of border of figure.
 * @attr {number} [stroke-width=5] - Width of border of figure.
 * @prop {number} [slant=30] - Number of degrees parallelogram should slant.
 * @attr {number} [slant=30] - Number of degrees parallelogram should slant.
 * @prop {number} [innerX=300] - Number of pixels left edge of inner content should be set to.
 * @attr {number} [inner-x=300] - Number of pixels left edge of inner content should be set to.
 * @prop {number} [innerY=100] - Number of pixels top edge of inner content should be set to.
 * @attr {number} [inner-y=300] - Number of pixels top edge of inner content should be set to.
 * @prop {number} [innerWidth=200] - Number of pixels wide the inner content should be provided.
 * @attr {number} [inner-width=200] - Number of pixels wide the inner content should be provided.
 * @prop {number} [innerHeight=100] - Number of pixels high the inner content should be provided.
 * @attr {number} [inner-height=100] - Number of pixels high the inner content should be provided.
 */
export class XtalFigParallelogram extends HTMLElement implements ReactiveSurface, XtalPattern{
    static is = 'xtal-fig-parallelogram';
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
        xc.mergeProps<Partial<XtalFigParallelogramProps>>(this, slicedPropDefs, {
            width: 800, strokeWidth:5, height:300, slant:30, 
            innerWidth:200, innerHeight:100, innerX:300, innerY:100,
        });
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
}
export interface XtalFigParallelogram extends XtalFigParallelogramProps{}
type X = XtalFigParallelogram;
const propActions = [
    xp.manageMainTemplate,
    ({domCache, width, height}: X) => [
        {[refs.svgElement]: [,,{width, height}]},
        [{style:{width:`${width}px`, height:`${height}px`}}]
    ],
    ({slant, strokeWidth, width, height, self}: X) => {
        self.hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
    },
    ({domCache, width, strokeWidth, height, slant, hOffset}: X) => [{
        [refs.pathElements]:  [,, {d: `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z`}],
    }],
    ({domCache, strokeWidth}: X) => [{
        [refs.paraBorderPart]: [{style:{strokeWidth:strokeWidth}}],
    }],
    ({domCache, innerHeight, innerWidth, innerX, innerY}: X) => [{
        [refs.innerPart]: [,,{width: innerWidth, height: innerHeight, x: innerX, y: innerY}],
    }],
    xp.createShadow,
] as PropAction[];





xc.letThereBeProps(XtalFigParallelogram, slicedPropDefs, 'onPropChange');
xc.define(XtalFigParallelogram);

declare global {
    interface HTMLElementTagNameMap {
        "xtal-fig-parallelogram": XtalFigParallelogram,
    }
}