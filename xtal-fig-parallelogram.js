import { define } from 'carbon-copy/c-c.js';
import { html } from 'xtal-element/lib/html.js';
const mainTemplate = html `
<style>
    :host[hidden]{
        display:none;
    }
    :host{
        display:block;
    } 
</style>
<svg xmlns="http://www.w3.org/2000/svg" width={{width}} height={{height}}">
    <path d="M {{topLeft ?? 205}},5 L {{topRight}},5 L {{bottomRight ?? 595}},295 L 5,295 L {{topLeft ?? 205}},5 z" id="path59" style="fill:#ccff00;stroke:none" />
    <path d="M {{topLeft ?? 205}},5 L {{topRight}},5 L {{bottomRight ?? 595}},295 L 5,295 L {{topLeft ?? 205}},5 z" id="path61" style="fill:none;stroke:#000000;stroke-width:{{strokeWidth}};stroke-linejoin:round" />
    <g>
        <foreignobject x=100 width=100 height=500 requiredExtensions="http://www.w3.org/1999/xhtml">
                <!-- XHTML content goes here -->
            <body xmlns="http://www.w3.org/1999/xhtml">
                <p><slot></slot></p>
            </body>
        </foreignobject>
    </g>
    

</svg>
`;
/**
 * @element xtal-fig-parallelogram
 * @tag xtal-fig-parallelogram
 */
define('xtal-fig-parallelogram', mainTemplate, {
    numProps: ['topLeft=205', 'topRight', 'bottomRight=595', 'width=800', 'strokeWidth=5', 'height=300'],
    propActionsProp: [
        ({ width, strokeWidth, self }) => {
            self.topRight = width - strokeWidth;
            self.style.width = width + 'px';
        },
        ({ height, self }) => {
            self.style.height = height + 'px';
        }
    ]
});
