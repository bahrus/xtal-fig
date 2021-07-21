import {define} from 'carbon-copy/c-c.js';
import {CCProps} from 'carbon-copy/types.d.js';
import {html} from 'xtal-element/lib/html.js';

const mainTemplate = html`
<div id=parallelogram part=outer>
    <div id=inner part=inner>
        <slot></slot>
    </div>
</div>
<style>
:host{
    --outer-background-color: lightblue;
    --outer-skew:skew(20deg);
    --inner-unskew:skew(-20deg);
}
</style>
<style>
:host{
    display:block;
}
#parallelogram {
   width: 100%; 
   height: 100%;
   background-color: var(--outer-background-color);
   /* Skew */
   -webkit-transform: var(--outer-skew);
   -moz-transform: var(--outer-skew); 
   -o-transform: var(--outer-skew);
   transform: var(--outer-skew);
}
#inner {
    /* Skew */
    -webkit-transform: var(--inner-unskew); 
   -moz-transform: var(--inner-unskew); 
   -o-transform: var(--inner-unskew);
   transform: var(--inner-unskew);
}
</style>
`;
/**
 * @element xtal-fig-parallelogram
 * @tag xtal-fig-parallelogram
 */
define('xtal-fig-parallelogram', mainTemplate, {} as CCProps);