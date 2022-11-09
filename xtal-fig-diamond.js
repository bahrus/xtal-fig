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
export class XtalFigDiamondCore extends HTMLElement {
    setDimensions({ width, height, strokeWidth, innerWidth, innerHeight, innerX, innerY }) {
        console.log(this.clonedTemplate);
        return [{}, {}, {
                transform: {
                    svgE: [, , { width, height }],
                    path: [, , { d: [`M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height - strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`], }],
                    diamondBorderP: {
                        style: { strokeWidth: [strokeWidth.toString()] }
                    },
                    innerP: [, , { width: innerWidth, height: innerHeight, x: innerX, y: innerY }],
                    ':host': {
                        style: { width: `${width}px`, height: `${width}px` },
                    },
                }
            }];
    }
}
const noParse = {
    parse: false
};
const xe = new XE({
    config: {
        tagName: 'xtal-fig-diamond',
        propDefaults: {
            width: 800, height: 300, innerWidth: 200, strokeWidth: 5, innerHeight: 100, innerX: 300, innerY: 100,
        },
        actions: {
            ...beCloned,
            setDimensions: {
                ifAllOf: ['width', 'height']
            },
            ...beMounted,
        }
    },
    complexPropDefaults: {
        mainTemplate
    },
    superclass: XtalFigDiamondCore,
    mixins: [TemplMgmt]
});
