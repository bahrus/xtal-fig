import {XE} from 'xtal-element/XE.js';
import {TemplMgmt, TemplMgmtProps, TemplMgmtActions, beCloned, beMounted} from 'trans-render/lib/mixins/TemplMgmt.js';
import { DiamondActions, DiamondProps, PDiamond, EDiamond, DT } from './types';
import { Action, PropInfo } from 'trans-render/lib/types';
import { IEventConfig, DynamicTransform, ActionOnEventConfigs } from 'trans-render/froop/types';


const mainTemplate = String.raw`
<style>
    :host[hidden]{
        display:none;
    }
    :host{
        display:block;
    } 
</style>
<svg xmlns="http://www.w3.org/2000/svg">
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



export class XtalFigDiamondCore extends HTMLElement implements DiamondActions{
    setDimensions({width, height, strokeWidth, innerWidth, innerHeight, innerX, innerY}: this): [PDiamond, EDiamond, DT] {
        return [,, {
            transform: {
                ':host': {
                    style: {width: `${width}px`, height: `${width}px`},
                },
                svgE: [,,{width, height}],
                path: [,, {d: [`M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height-strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`],}],
                diamondBorderP: {
                    style: {strokeWidth: [strokeWidth.toString()]}
                },
                innerP: [,,{width: innerWidth, height: innerHeight, x: innerX, y: innerY}],

            }
        }];
    }

}



export interface XtalFigDiamondCore extends DiamondProps{}

export interface XtalFigDiamondCore extends TemplMgmtProps{}

// const noParse: PropInfo = {
//     parse: false
// };

const xe = new XE<
    DiamondProps & TemplMgmtProps, 
    DiamondActions & TemplMgmtActions
>({
    config:{
        tagName: 'xtal-fig-diamond',
        propDefaults:{
            mntCnt: 1,
            width:800, height:300, innerWidth:200, strokeWidth:5, innerHeight:100, innerX:300, innerY:100,
        },
        actions:{
            ...beCloned,
            setDimensions:{
                ifAllOf: ['width', 'height']
            },
            ...beMounted,
        }
    },
    complexPropDefaults:{
        mainTemplate
    },
    superclass: XtalFigDiamondCore,
    mixins: [TemplMgmt]
});
type X = XtalFigDiamondCore;
declare global {
    interface HTMLElementTagNameMap {
        "xtal-fig-diamond": XtalFigDiamondCore,
    }
}