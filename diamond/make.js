import { beCloned, beMounted, } from 'trans-render/lib/mixins/TemplMgmt.js';
export class XtalFigDiamondCore extends HTMLElement {
    setDimensions({ width, height, strokeWidth, innerWidth, innerHeight, innerX, innerY }) {
        return [, , {
                transform: {
                    ':host': {
                        style: { width: `${width}px`, height: `${height}px` },
                    },
                    svgE: [, , { width, height }],
                    path: [, , { d: [`M ${width / 2},${strokeWidth} L ${strokeWidth},${height / 2} L ${width / 2},${height - strokeWidth} L ${width - strokeWidth},${height / 2} L ${width / 2},${strokeWidth} z`], }],
                    diamondBorderP: {
                        style: { strokeWidth: [strokeWidth.toString()] }
                    },
                    innerP: [, , { width: innerWidth, height: innerHeight, x: innerX, y: innerY }],
                }
            }];
    }
}
export const make = {
    ":host": {
        be: 'definitive',
        having: {
            config: {
                propDefaults: {
                    width: 800, height: 300, innerWidth: 200, strokeWidth: 5, innerHeight: 100, innerX: 300, innerY: 100
                },
                actions: {
                    ...beCloned,
                    setDimensions: {
                        ifAllOf: ['width', 'height'],
                    },
                    ...beMounted
                }
            },
            superclass: XtalFigDiamondCore
        }
    }
};
