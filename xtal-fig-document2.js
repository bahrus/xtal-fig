import { XE } from 'xtal-element/src/XE.js';
import { tm } from 'trans-render/lib/TemplMgmtWithPEST.js';
const mainTemplate = tm.html `
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
export class XtalFigDocumentCore extends HTMLElement {
    setOwnDimensions = ({ width, height }) => ({
        style: { width: `${width}px`, height: `${height}px` }
    });
    setSVGDimensions = ({ width, height }) => [, , { width, height }];
}
const isRef = {
    parse: false,
    isRef: true,
};
const xe = new XE({
    config: {
        tagName: 'xtal-fig-document',
        propDefaults: {
            width: 250, height: 500,
        },
        propInfo: {
            svgElements: isRef,
        },
        actions: {
            ...tm.doInitTransform,
            setOwnDimensions: {
                actIfKeyIn: ['width', 'height'],
            },
            setSVGDimensions: {
                actIfKeyIn: ['width', 'height'],
                target: 'svgElements'
            },
        }
    },
    complexPropDefaults: {
        mainTemplate,
    },
    superclass: XtalFigDocumentCore,
    mixins: [tm.TemplMgmtMixin]
});
