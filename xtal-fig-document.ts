import {XE} from 'xtal-element/src/XE.js';
import {TemplMgmtProps, tm} from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import {INotifyMixin} from 'trans-render/lib/mixins/notify.js';
import {XtalFigDocumentProps, XtalFigDocumentActions} from './types.js';
import { PropInfo } from '../trans-render/lib/types.js';

const mainTemplate = tm.html`
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

const setOwnDimensions = ({width, height}: X) => ({
    style: {width:`${width}px`, height:`${height}px`}
});
const setSVGDimensions = ({width, height}: X) => [,,{width, height}];

export class XtalFigDocumentCore extends HTMLElement implements XtalFigDocumentActions{
    setOwnDimensions = setOwnDimensions;
    setSVGDimensions = setSVGDimensions;
}

export interface XtalFigDocumentCore extends XtalFigDocumentProps{}

const isRef: PropInfo = {
    parse: false, 
    isRef: true,
};

const xe = new XE<XtalFigDocumentProps & TemplMgmtProps, XtalFigDocumentActions>({
    config:{
        tagName: 'xtal-fig-document',
        propDefaults:{
            width: 250, height: 500,
        },
        propInfo:{
            svgElements: isRef,
        },
        actions:{
            ...tm.doInitTransform,
            setOwnDimensions:{
                ifKeyIn: ['width', 'height'],
            },
            setSVGDimensions:{
                ifKeyIn: ['width', 'height'],
                target: 'svgElements'
            },

        }
    },
    complexPropDefaults:{
        mainTemplate,
    },
    superclass: XtalFigDocumentCore,
    mixins:[tm.TemplMgmtMixin]
});

type X = XtalFigDocumentCore;
declare global {
    interface HTMLElementTagNameMap {
        "xtal-fig-document": XtalFigDocumentCore,
    }
}