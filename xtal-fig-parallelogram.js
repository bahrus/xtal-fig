import { XE } from 'xtal-element/XE.js';
import { TemplMgmt, beCloned, beMounted } from 'trans-render/lib/mixins/TemplMgmt.js';
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
export class XtalFigParallelogramCore extends HTMLElement {
    setDimensions({ width, height, strokeWidth, innerWidth, innerHeight, innerX, innerY, slant }) {
        const hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
        return [, , {
                transform: {
                    // ':host':{
                    //     style: {width: `${width}px`, height: `${height}px`},
                    // },
                    path: [, , { d: [
                                `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z`
                            ] }],
                    paraBorderP: {
                        style: { strokeWidth: [strokeWidth.toString()] },
                    },
                }
            }];
    }
}
const xe = new XE({
    config: {
        tagName: 'xtal-fig-parallelogram',
        propDefaults: {
            mntCnt: 1,
            width: 800, strokeWidth: 5, height: 300, slant: 30,
            innerWidth: 200, innerHeight: 100, innerX: 300, innerY: 100,
            transform: {
                ':host': [{
                        ".style.width": ['', 'width', 'px'], ".style.height": ['', 'height', 'px']
                    }],
                innerP: [, , { width: 'innerWidth', height: 'innerHeight', x: 'innerX', y: 'innerY' }],
                svgE: [, , { width: 'width', height: 'height' }],
            }
        },
        actions: {
            ...beCloned,
            setDimensions: {
                ifAllOf: ['width', 'height'],
            },
            ...beMounted,
        }
    },
    complexPropDefaults: {
        mainTemplate,
    },
    superclass: XtalFigParallelogramCore,
    mixins: [TemplMgmt]
});
