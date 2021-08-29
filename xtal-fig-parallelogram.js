import { XE } from 'xtal-element/src/XE.js';
import { tm } from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
const mainTemplate = tm.html `
<style>
    :host[hidden]{
        display:none;
    }
    :host{
        display:block;
    } 

</style>
<svg xmlns="http://www.w3.org/2000/svg">
    <path part=para-fill 
        style="fill:#ccff00;stroke:none" />
    <path part=para-border 
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
const setHOffset = ({ width, slant, strokeWidth }) => ({
    hOffset: width * Math.sin(Math.PI * slant / 180) + strokeWidth
});
const setPaths = ({ width, strokeWidth, height, slant, hOffset }) => [, , { d: `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z` }];
const setBorder = ({ strokeWidth }) => ({
    style: { strokeWidth: strokeWidth.toString() }
});
const setInnerDimensions = ({ innerHeight, innerWidth, innerX, innerY }) => [, , { width: innerWidth, height: innerHeight, x: innerX, y: innerY }];
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
export class XtalFigParallelogramCore extends HTMLElement {
    setOwnDimensions = setOwnDimensions;
    setSVGDimensions = setSVGDimensions;
    setHOffset = setHOffset;
    setPaths = setPaths;
    setBorder = setBorder;
    setInnerDimensions = setInnerDimensions;
}
const isRef = {
    parse: false,
    isRef: true,
};
const xe = new XE({
    config: {
        tagName: 'xtal-fig-parallelogram',
        propDefaults: {
            width: 800, strokeWidth: 5, height: 300, slant: 30,
            innerWidth: 200, innerHeight: 100, innerX: 300, innerY: 100,
        },
        propInfo: {
            pathElements: isRef,
            paraBorderParts: isRef,
            svgElements: isRef,
            innerParts: isRef,
        },
        actions: {
            ...tm.doInitTransform,
            setOwnDimensions: {
                ifKeyIn: ['width', 'height'],
            },
            setSVGDimensions: {
                ifKeyIn: ['width', 'height'],
                target: 'svgElements'
            },
            setHOffset: {
                ifKeyIn: ['width', 'slant', 'strokeWidth'],
            },
            setPaths: {
                ifKeyIn: ['width', 'height', 'strokeWidth', 'slant', 'hOffset'],
                target: 'pathElements'
            },
            setBorder: {
                ifKeyIn: ['strokeWidth'],
                target: 'paraBorderParts',
            },
            setInnerDimensions: {
                ifKeyIn: ['innerHeight', 'innerWidth', 'innerX', 'innerY'],
                target: 'innerParts'
            }
        }
    },
    complexPropDefaults: {
        mainTemplate,
    },
    superclass: XtalFigParallelogramCore,
    mixins: [tm.TemplMgmtMixin]
});
