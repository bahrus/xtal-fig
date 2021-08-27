import { XE } from 'xtal-element/src/XE.js';
import { tm } from 'trans-render/lib/TemplMgmtWithPEST.js';
import { NotifyMixin } from 'trans-render/lib/mixins/notify.js';
const mainTemplate = tm.html `
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
    // setHOffset(self: this){
    //     const {width, slant, strokeWidth} = self;
    //     return {
    //         hOffset: width * Math.sin(Math.PI * slant / 180) + strokeWidth,
    //     }
    // }
    setHOffset = ({ width, slant, strokeWidth }) => ({
        hOffset: width * Math.sin(Math.PI * slant / 180) + strokeWidth
    });
    setStyle = ({ width, height }) => ({
        style: {
            width: `${width}px`,
            height: `${height}px`
        }
    });
    setPaths = ({ width, strokeWidth, height, slant, hOffset }) => [, , { d: `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z` }];
}
const xe = new XE({
    config: {
        tagName: 'xtal-fig-parallelogram',
        propDefaults: {
            initTransform: {}, width: 800, strokeWidth: 5, height: 300, slant: 30,
            innerWidth: 200, innerHeight: 100, innerX: 300, innerY: 100,
        },
        propInfo: {
            pathElements: {
                parse: false,
                isRef: true,
            }
        },
        actions: {
            ...tm.doInitTransform,
            setHOffset: {
                actIfKeyIn: ['width', 'slant', 'strokeWidth']
            },
            setStyle: {
                actIfKeyIn: ['width', 'height']
            },
            setPaths: {
                actIfKeyIn: ['width', 'height', 'strokeWidth', 'slant', 'hOffset'],
                target: 'pathElements'
            }
        }
    },
    complexPropDefaults: {
        mainTemplate: mainTemplate,
    },
    superclass: XtalFigParallelogramCore,
    mixins: [NotifyMixin, tm.TemplMgmtMixin]
});
