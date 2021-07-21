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
   -webkit-transform: skew(20deg); 
   -moz-transform: skew(20deg); 
   -o-transform: skew(20deg);
   transform: skew(20deg);
}
#inner {
/* Skew */
-webkit-transform: skew(-20deg); 
   -moz-transform: skew(-20deg); 
   -o-transform: skew(-20deg);
   transform: skew(-20deg);
}
</style>
`;
/**
 * @element xtal-fig-parallelogram
 * @tag xtal-fig-parallelogram
 */
define('xtal-fig-parallelogram', mainTemplate, {} as CCProps);