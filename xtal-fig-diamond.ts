import {XE} from 'xtal-element/src/XE.js';
import {TemplMgmtProps, TemplMgmtActions, tm} from 'trans-render/lib/TemplMgmtWithPEST.js';
import { XtalFigDiamondActions, XtalFigDiamondProps } from './types';
import { PropInfo } from 'trans-render/lib/types';


const mainTemplate = tm.html`
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
export class XtalFigDiamondCore extends HTMLElement implements XtalFigDiamondActions{
    setOwnDimensions = ({width, height}: this) => ({
        style: {width:`${width}px`, height:`${height}px`}
    });
    setSVGDimensions = ({width, height}: this) => [,,{width, height}];
    setPaths = ({width, strokeWidth, height}: this) => [,, {d: `M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height-strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`,}];
    setDiamondBorder = ({strokeWidth}: this) => ({
        style: {strokeWidth: strokeWidth.toString()}
    });
    setInnerDimensions = ({innerHeight, innerWidth, innerX, innerY}: this) => [,,{width: innerWidth, height: innerHeight, x: innerX, y: innerY}];
}

export interface XtalFigDiamondCore extends XtalFigDiamondProps{}
const isRef: PropInfo = {
    parse: false,
    isRef: true,
};
const xe = new XE<
    XtalFigDiamondProps & TemplMgmtProps, 
    XtalFigDiamondActions & TemplMgmtActions
>({
    config:{
        tagName: 'xtal-fig-diamond',
        propDefaults:{
            width:800, height:300, innerWidth:200, strokeWidth:5, innerHeight:100, innerX:300, innerY:100 
        },
        propInfo:{
            svgElements: isRef,
            pathElements: isRef,
            diamondBorderParts: isRef,
            innerParts: isRef,
        },
        actions:{
            ...tm.doInitTransform,
            setOwnDimensions:{
                actIfKeyIn: ['width', 'height']
            },
            setSVGDimensions:{
                actIfKeyIn: ['width', 'height'],
                target: 'svgElements'
            },
            setPaths:{
                actIfKeyIn: ['width', 'strokeWidth', 'height'],
                target: 'pathElements'
            },
            setDiamondBorder:{
                actIfKeyIn: ['strokeWidth'],
                target: 'diamondBorderParts'
            },
            setInnerDimensions:{
                actIfKeyIn: ['innerHeight', 'innerWidth', 'innerX', 'innerY'],
                target: 'innerParts'
            }
        }
    },
    complexPropDefaults:{
        mainTemplate
    },
    superclass: XtalFigDiamondCore,
    mixins: [tm.TemplMgmtMixin]
});

declare global {
    interface HTMLElementTagNameMap {
        "xtal-fig-diamond": XtalFigDiamondCore,
    }
}