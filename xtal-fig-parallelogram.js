import { define } from 'carbon-copy/c-c.js';
import { html } from 'xtal-element/lib/html.js';
const mainTemplate = html `
<div id=parallelogram part=parallelogram>
    <slot></slot>
</div>
<style>
:host{
    display:block;
}
#parallelogram {
   width: 100%; 
   height: 100%;
   background: blue;
   /* Skew */
   -webkit-transform: skew(20deg); 
   -moz-transform: skew(20deg); 
   -o-transform: skew(20deg);
   transform: skew(20deg);
}
</style>
`;
/**
 * @element xtal-fig-parallelogram
 * @tag xtal-fig-parallelogram
 */
define('xtal-fig-parallelogram', mainTemplate, {});
