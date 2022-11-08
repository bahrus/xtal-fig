import {XE} from 'xtal-element/XE.js';
import {TemplMgmt, TemplMgmtProps, TemplMgmtActions, beTransformed} from 'trans-render/lib/mixins/TemplMgmt.js';
import { XtalFigDiamondActions, XtalFigDiamondProps } from './types';
import { Action, PropInfo } from 'trans-render/lib/types';
import { IEventConfig, DynamicTransform } from './trans-render/froop/types';


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



export class XtalFigDiamondCore extends HTMLElement implements XtalFigDiamondActions{
    setDimensions({width, height, strokeWidth, innerWidth, innerHeight, innerX, innerY}: this): 
               [Partial<this>, Partial<{ setDimensions: IEventConfig<XtalFigDiamondProps, XtalFigDiamondActions, Action<any>>; }>, 
                DynamicTransform] {
        return [{}, {}, {
            transform: {
                ':host': {
                    style: {width: `${width}px`, height: `${width}px`}
                },
                svgE: [,,{width, height}],
                path: [,, {d: [`M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height-strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`],}],
                diamondBorderP: {
                    style: {strokeWidth: [strokeWidth.toString()]}
                },
                innerP: [,,{width: innerWidth, height: innerHeight, x: innerX, y: innerY}]
            }
        }];
    }

}



export interface XtalFigDiamondCore extends XtalFigDiamondProps{}

const noParse: PropInfo = {
    parse: false
};

const xe = new XE<
    XtalFigDiamondProps & TemplMgmtProps, 
    XtalFigDiamondActions & TemplMgmtActions
>({
    config:{
        tagName: 'xtal-fig-diamond',
        propDefaults:{
            width:800, height:300, innerWidth:200, strokeWidth:5, innerHeight:100, innerX:300, innerY:100,
        },
        actions:{
            ...beTransformed,
            setDimensions:{
                ifAllOf: ['width', 'height']
            }
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