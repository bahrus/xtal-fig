import {XE} from 'xtal-element/XE.js';
import {TemplMgmt, TemplMgmtProps, beTransformed, beCloned, beMounted} from 'trans-render/lib/mixins/TemplMgmt.js';
import {DocProps, DocActions, PDoc, EDoc, DT} from './types.js';
import { PropInfo } from 'trans-render/lib/types.js';

const mainTemplate = String.raw`
<style>
    :host[hidden]{
        display:none;
    }
    :host{
        display:block;
    } 
</style>
<svg width="102px"
    height="62px"  viewBox="-0.5 -0.5 102 62">
    <!-- <defs /> -->
    <g>
        <path
            d="M 96 1 C 98.76 1 101 3.24 101 6 L 101 53.5 Q 76 40 51 53.5 Q 26 67 1 53.5 L 1 8.5 L 1 6 C 1 3.24 3.24 1 6 1 Z"
            fill="#ffffff" stroke="#000000" stroke-width="2" stroke-miterlimit="10" pointer-events="none" />
    </g>
</svg>
<slot style="display:none"></slot>
<slot-bot></slot-bot>
<div part=inner class=inner ></div>
<style>
    .inner{
        position:relative;
        top:-50%;
        left:25%
    }
</style>
`;

export class XtalFigDocumentCore extends HTMLElement implements DocActions{
    setDimensions({width, height}: this): [PDoc, EDoc, DT]{
        return [,,{
            transform:{
                ':host': {
                    style: {width: `${width}px`, height: `${width}px`},
                },
                svgE: [,,{width, height}],
            }
        }]
    }

}

export interface XtalFigDocumentCore extends DocProps{}


const xe = new XE<DocProps & TemplMgmtProps, DocActions>({
    config:{
        tagName: 'xtal-fig-document',
        propDefaults:{
            width: 250, height: 500,
        },
        actions:{
            ...beCloned,
            setDimensions: {
                ifAllOf: ['width', 'height']
            },
            ...beMounted
        }
    },
    complexPropDefaults:{
        mainTemplate,
    },
    superclass: XtalFigDocumentCore,
    mixins:[TemplMgmt]
});

type X = XtalFigDocumentCore;
declare global {
    interface HTMLElementTagNameMap {
        "xtal-fig-document": XtalFigDocumentCore,
    }
}