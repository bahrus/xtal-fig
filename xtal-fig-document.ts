import {xc, IReactor, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {XtalFigBaseVBox, slicedPropDefs} from './xtal-fig-base-vbox-svg.js';
import {html} from 'xtal-element/lib/html.js';
import {xp, XtalPattern} from 'xtal-element/lib/XtalPattern.js';
import {XtalFigBaseVBoxProps} from './types.d.js';

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
    <g>
    <foreignObject part=inner width="100%" height="100%">
        <slot></slot>
    </foreignObject>
    </g>
</svg>
`;

const refs = {svgElement: '', innerPart: '', slotElement: ''};

export class XtalFigDocument extends XtalFigBaseVBox{
    static is = 'xtal-fig-document';
    refs = refs;
    propActions = propActions;
    mainTemplate = mainTemplate;
    connectedCallback(){
        xc.mergeProps<Partial<XtalFigBaseVBoxProps>>(this, slicedPropDefs, {
            width: 800, height: 500, 
            innerX: 20, innerY: 20,
        });
    }
}



type X = XtalFigDocument;

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

xc.define(XtalFigDocument);

declare global {
    interface HTMLElementTagNameMap {
        "xtal-fig-document": XtalFigDocument,
    }
}