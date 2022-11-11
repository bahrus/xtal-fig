import {XE} from 'xtal-element/XE.js';
import {TemplMgmt, TemplMgmtProps, TemplMgmtActions, beCloned, beMounted} from 'trans-render/lib/mixins/TemplMgmt.js';
import {ParaProps, ParaActions, PPara, EPara, DT} from './types.js';

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



export class XtalFigParallelogramCore extends HTMLElement implements ParaActions{
    setDimensions({width, height, strokeWidth, innerWidth, innerHeight, innerX, innerY, slant}: this): [PPara, EPara, DT] {
        const hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
        return [,,{
            transform:{

                path: [,, {d: [
                    `M ${hOffset},${strokeWidth} L ${width - strokeWidth},${strokeWidth} L ${width - hOffset},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} L ${hOffset},${strokeWidth} z`
                ]}],
                // paraBorderP: {
                //     style: {strokeWidth: [strokeWidth.toString()]},
                // },
                
            }
        }]
    }
}


export interface XtalFigParallelogramCore extends ParaProps{}

const xe = new XE<ParaProps & TemplMgmtProps, ParaActions>({
    config:{
        tagName: 'xtal-fig-parallelogram',
        propDefaults:{
            mntCnt: 1,
            width: 800, strokeWidth:5, height:300, slant:30, 
            innerWidth:200, innerHeight:100, innerX:300, innerY:100,
            transform: {
                ':host': [{
                    ".style.width": ['', 'width', 'px'], ".style.height": ['', 'height', 'px']
                }],
                innerP: [,,{width: 'innerWidth', height: 'innerHeight', x: 'innerX', y: 'innerY'}],
                svgE: [,,{width: 'width', height: 'height'}],
                paraBorderP: [{".style.strokeWidth": ['', '.strokeWidth.toString|']}]
            }
        },

        actions:{
            ...beCloned,
            setDimensions:{
                ifAllOf: ['width', 'height'],
            },
            ...beMounted,
        }
    },
    complexPropDefaults:{
        mainTemplate,
    },
    superclass: XtalFigParallelogramCore,
    mixins:[TemplMgmt]
});

type X = XtalFigParallelogramCore;
declare global {
    interface HTMLElementTagNameMap {
        "xtal-fig-parallelogram": XtalFigParallelogramCore,
    }
}