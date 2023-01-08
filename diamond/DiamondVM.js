export class DiamondVM extends HTMLElement {
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
