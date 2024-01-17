import {XForm} from 'trans-render/types';
import {Localizer, TemplMgmtProps} from 'trans-render/lib/mixins/types';
import {HTMLElement, makeXtalElement} from '../node_modules/be-importing/makeXtalElement.mjs';

export interface Props{
    strokeWidth: number,
    slant: number,
    innerWidth: number,
    innerHeight: number,
    innerX: number,
    innerY: number,
    width: number,
    height: number
}

export interface Methods{
    setDimensions(self: this): Partial<Props>
}

const propDefaults: Partial<Props> = {
    strokeWidth: 5,
    slant: 30,
    innerWidth: 200,
    innerHeight: 100,
    innerX: 300,
    innerY: 100,
    width: 800,
    height: 300
}

class XtalFigParallelogramCore extends HTMLElement{
    setDimensions(self: this) {
        const {width, height, strokeWidth, innerWidth, innerHeight, innerX, innerY, slant} = self
        const hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
        return {
            "* path": {
                " d": [
                    `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z`
                ]
            }
        }
    }
}

interface XtalFigParallelogramCore extends Props{}


makeXtalElement<Props  & TemplMgmtProps, Methods & Localizer>({
    superclass: 'xtal-fig-parallelogram-core',
    xform:{
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
            {o: 'width', sa: 'width'},
            {o: 'height', sa: 'height'}
        ],
        '% para-border':{
            o: 'strokeWidth',
            ss: 'strokeWidth'
        },
    },
    lcXform: {
        ':root': [
            {o: 'width', ss: 'width'},
            {o: 'height', ss: 'height'}
        ]
    },
    propDefaults,
    actions: {
        setDimensions: {
            ifAllOf: ['clonedTemplate', 'width', 'height']
        }
    }
}, [XtalFigParallelogramCore], XtalFigParallelogramCore.name);