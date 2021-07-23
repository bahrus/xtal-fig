import { define } from 'carbon-copy/c-c.js';
import { html } from 'xtal-element/lib/html.js';
const mainTemplate = html `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="300">
    <path d="M {{topLeft}},5 L 795,5 L 595,295 L 5,295 L {{topLeft}},5 z" id="path59" style="fill:#ccff00;stroke:none" />
    <path d="M {{topLeft}},5 L 795,5 L 595,295 L 5,295 L {{topLeft}},5 z" id="path61" style="fill:none;stroke:#000000;stroke-width:5;stroke-linejoin:round" />
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
    numProps: ['topLeft=205']
});
