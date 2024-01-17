import { HTMLElement, makeXtalElement } from '../node_modules/be-importing/makeXtalElement.mjs';
const propDefaults = {
    strokeWidth: 5,
    slant: 30,
    innerWidth: 200,
    innerHeight: 100,
    innerX: 300,
    innerY: 100,
    width: 800,
    height: 300
};
class XtalFigParallelogramCore extends HTMLElement {
    setDimensions(self) {
        const { width, height, strokeWidth, innerWidth, innerHeight, innerX, innerY, slant } = self;
        const hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
        return {
            "* path": {
                " d": [
                    `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z`
                ]
            }
        };
    }
}
makeXtalElement({
    superclass: 'xtal-fig-parallelogram-core',
    xform: {
        '% inner': [
            {
                o: 'innerWidth',
                sa: 'width'
            },
            {
                o: 'innerHeight',
                sa: 'height'
            }
        ],
        svg: [
            { o: 'width', sa: 'width' },
            { o: 'height', sa: 'height' }
        ],
        '% para-border': {
            o: 'strokeWidth',
            ss: 'strokeWidth'
        },
    },
    lcXform: {
        ':root': [
            { o: 'width', ss: 'width' },
            { o: 'height', ss: 'height' }
        ]
    },
    propDefaults,
    actions: {
        setDimensions: {
            ifAllOf: ['clonedTemplate', 'width', 'height']
        }
    }
}, [XtalFigParallelogramCore], XtalFigParallelogramCore.name);
