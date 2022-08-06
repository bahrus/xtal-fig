import { XE } from 'xtal-element/src/XE.js';
import { TemplMgmt, beTransformed } from 'trans-render/lib/mixins/TemplMgmt.js';
const mainTemplate = String.raw `
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
const setOwnDimensions = ({ width, height }) => ({
    style: { width: `${width}px`, height: `${height}px` }
});
const setSVGDimensions = ({ width, height }) => [, , { width, height }];
const setPaths = ({ width, strokeWidth, height }) => [, , { d: `M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height - strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`, }];
const setDiamondBorder = ({ strokeWidth }) => ({
    style: { strokeWidth: strokeWidth.toString() }
});
const setInnerDimensions = ({ innerHeight, innerWidth, innerX, innerY }) => [, , { width: innerWidth, height: innerHeight, x: innerX, y: innerY }];
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
export class XtalFigDiamondCore extends HTMLElement {
    setOwnDimensions = setOwnDimensions;
    setSVGDimensions = setSVGDimensions;
    setPaths = setPaths;
    setDiamondBorder = setDiamondBorder;
    setInnerDimensions = setInnerDimensions;
}
const noParse = {
    parse: false
};
const xe = new XE({
    config: {
        tagName: 'xtal-fig-diamond',
        propDefaults: {
            width: 800, height: 300, innerWidth: 200, strokeWidth: 5, innerHeight: 100, innerX: 300, innerY: 100,
            hydratingTransform: {
                svgElements: true,
                pathElements: true,
                diamondBorderParts: true,
                innerPart: true,
            }
        },
        propInfo: {
            svgElements: noParse,
            pathElements: noParse,
            diamondBorderParts: noParse,
            innerPart: noParse,
        },
        actions: {
            ...beTransformed,
            setOwnDimensions: {
                ifKeyIn: ['width', 'height']
            },
            setSVGDimensions: {
                ifKeyIn: ['width', 'height'],
                ifAllOf: ['svgElements'],
                target: 'svgElements'
            },
            setPaths: {
                ifKeyIn: ['width', 'strokeWidth', 'height'],
                ifAllOf: ['pathElements'],
                target: 'pathElements'
            },
            setDiamondBorder: {
                ifKeyIn: ['strokeWidth'],
                ifAllOf: ['diamondBorderParts'],
                target: 'diamondBorderParts'
            },
            setInnerDimensions: {
                ifKeyIn: ['innerHeight', 'innerWidth', 'innerX', 'innerY'],
                ifAllOf: ['innerPart'],
                target: 'innerPart'
            }
        }
    },
    complexPropDefaults: {
        mainTemplate
    },
    superclass: XtalFigDiamondCore,
    mixins: [TemplMgmt]
});
