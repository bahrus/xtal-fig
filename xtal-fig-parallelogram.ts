import {define} from 'carbon-copy/c-c.js';
import {CCProps} from 'carbon-copy/types.d.js';
import {html} from 'xtal-element/lib/html.js';

const mainTemplate = html`
<style>
    :host[hidden]{
        display:none;
    }
    :host{
        display:block;
    } 
</style>
<svg xmlns="http://www.w3.org/2000/svg" width={{width}} height={{height}}">
    <path d="M {{topLeft}},{{strokeWidth}} L {{topRight}},{{strokeWidth}} L {{bottomRight}},295 L {{strokeWidth}},295 L {{topLeft}},{{strokeWidth}} z" id="path59" style="fill:#ccff00;stroke:none" />
    <path d="M {{topLeft}},{{strokeWidth}} L {{topRight}},{{strokeWidth}} L {{bottomRight}},295 L {{strokeWidth}},295 L {{topLeft}},{{strokeWidth}} z" id="path61" style="fill:none;stroke:#000000;stroke-width:{{strokeWidth}};stroke-linejoin:round" />
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
    numProps:['topLeft', 'topRight', 'bottomRight', 'width=800', 'strokeWidth=5', 'height=300', 'slant=30'],
    propActionsProp:[
        ({width, strokeWidth, self}: any) => {
            self.topRight = width - strokeWidth;
            self.style.width = width + 'px';
        },
        ({height, self}: any) => {
            self.style.height = height + 'px';
        },
        ({slant, width, strokeWidth, self}: any) => {
            const hOffset = width * Math.sin(Math.PI * slant / 180) + strokeWidth;
            self.topLeft = hOffset;
            self.bottomRight = width - hOffset;
        }
    ]
} as CCProps);