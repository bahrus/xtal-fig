import { xc } from 'xtal-element/lib/XtalCore.js';
import { xp } from 'xtal-element/lib/XtalPattern.js';
import { html } from 'xtal-element/lib/html.js';
import { DOMKeyPEA } from 'xtal-element/lib/DOMKeyPEA.js';
const mainTemplate = html `
<svg width="102px"
    height="62px" viewBox="-0.5 -0.5 102 62">
    <defs />
    <g>
        <path
            d="M 96 1 C 98.76 1 101 3.24 101 6 L 101 53.5 Q 76 40 51 53.5 Q 26 67 1 53.5 L 1 8.5 L 1 6 C 1 3.24 3.24 1 6 1 Z"
            fill="#ffffff" stroke="#000000" stroke-width="2" stroke-miterlimit="10" pointer-events="none" />
    </g>
</svg>
`;
const refs = { svgElement: '' };
export class XtalFigDocument extends HTMLElement {
    static is = 'xtal-fig-document';
    self = this;
    propActions = propActions;
    refs = refs;
    mainTemplate = mainTemplate;
    reactor = new xp.RxSuppl(this, [{
            rhsType: Array,
            ctor: DOMKeyPEA,
        }]);
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs, {});
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
const propActions = [
    xp.manageMainTemplate,
    ({ domCache, width, height }) => [
        { [refs.svgElement]: [, , { width, height }] },
        [{ style: { width: `${width}px`, height: `${height}px` } }]
    ],
    xp.createShadow,
];
const baseProp = {
    dry: true,
    async: true,
};
const numProp = {
    ...baseProp,
    type: Number,
};
const propDefMap = {
    ...xp.props,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalFigDocument, slicedPropDefs, 'onPropChange');
xc.define(XtalFigDocument);
