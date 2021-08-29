import { XE } from 'xtal-element/src/XE.js';
import { tm } from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import 'slot-bot/slot-bot.js';
const mainTemplate = tm.html `
<style>
    :host[hidden]{
        display:none;
    }
    :host{
        display:block;
    }
    
</style>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xl="http://www.w3.org/1999/xlink" version="1.1"
    viewBox="42 42 103 112" width="103pt" height="112pt">
    <defs>
        <linearGradient x1="0" x2="1" id="Gradient" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#6ff" />
            <stop offset="1" stop-color="blue" />
        </linearGradient>
        <linearGradient id="Obj_Gradient" xl:href="#Gradient"
            gradientTransform="translate(51.500004 99.5) scale(83.622)" />
        <linearGradient x1="0" x2="1" id="Gradient_2" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#6ff" />
            <stop offset="1" stop-color="blue" />
        </linearGradient>
        <linearGradient id="Obj_Gradient_2" xl:href="#Gradient_2"
            gradientTransform="translate(50 134.299194) rotate(10017912e-12) scale(85)" />
    </defs>
    <g stroke="none" stroke-opacity="1" stroke-dasharray="none" fill="none" fill-opacity="1">
        <title>Canvas 2</title>
        <g>
            <title>Layer 1</title>
            <rect x="51.500004" y="63" width="83.62201" height="73" fill="url(#Obj_Gradient)" />
            <path
                d="M 92.5 134.299194 L 134.89647 135.43617 C 133.25914 144.41605 112.95027 151.18663 89.535347 150.558685 C 68.11857 149.984344 51.18185 143.37456 50.058247 135.15222 Z"
                fill="url(#Obj_Gradient_2)" />
            <path
                d="M 134.89647 135.43617 C 133.25914 144.41605 112.95027 151.18663 89.535347 150.558685 C 68.11857 149.984344 51.18185 143.37456 50.058247 135.15222"
                stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
            <path
                d="M 92.169296 60 L 133.73709 61.116108 C 132.13176 69.931137 112.21985 76.57744 89.26259 75.96103 C 68.26442 75.397217 51.658745 68.908768 50.557102 60.837372 Z"
                fill="#6cf" />
            <path
                d="M 133.73709 61.116108 C 132.13176 69.931137 112.21985 76.57744 89.26259 75.96103 C 68.26442 75.397217 51.658745 68.908768 50.557102 60.837372"
                stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
            <line x1="50" y1="63.5" x2="50" y2="135" stroke="black" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2.835" />
            <line x1="135" y1="63.5" x2="135" y2="135" stroke="black" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2.835" />
            <path
                d="M 92.5 63 L 50.103527 61.883896 C 51.74086 53.068867 72.04973 46.42257 95.464653 47.038975 C 116.88143 47.60278 133.818146 54.091225 134.94176 62.162624 Z"
                fill="#6cf" />
            <path
                d="M 50.103527 61.883896 C 51.74086 53.068867 72.04973 46.42257 95.464653 47.038975 C 116.88143 47.60278 133.818146 54.091225 134.94176 62.162624"
                stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        </g>
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
const setOwnDimensions = ({ width, height }) => ({
    style: { width: `${width}px`, height: `${height}px` }
});
const setSVGDimensions = ({ width, height }) => [, , { width, height }];
/**
 * @element xtal-fig-db-cylinder
 * @tag xtal-fig-db-cylinder
 * @prop {number} [width=250] - Number of pixels wide the figure should be.
 * @attr {number} [width=250] - Number of pixels wide the figure should be.
 * @prop {number} [height=500] - Number of pixels high the figure should be.
 * @attr {number} [height=500] - Number of pixels high the figure should be.
 */
export class XtalFigDBCylinderCore extends HTMLElement {
    setOwnDimensions = setOwnDimensions;
    setSVGDimensions = setSVGDimensions;
}
const isRef = {
    parse: false,
    isRef: true,
};
const xe = new XE({
    config: {
        tagName: 'xtal-fig-db-cylinder',
        propDefaults: {
            width: 250, height: 500,
        },
        propInfo: {
            svgElements: isRef,
        },
        actions: {
            ...tm.doInitTransform,
            setOwnDimensions: {
                ifKeyIn: ['width', 'height'],
            },
            setSVGDimensions: {
                ifKeyIn: ['width', 'height'],
                target: 'svgElements'
            },
        }
    },
    complexPropDefaults: {
        mainTemplate,
    },
    superclass: XtalFigDBCylinderCore,
    mixins: [tm.TemplMgmtMixin]
});
