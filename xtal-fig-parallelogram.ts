import {define} from 'carbon-copy/c-c.js';
import {CCProps} from 'carbon-copy/types.d.js';
import {html} from 'xtal-element/lib/html.js';

const mainTemplate = html`
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