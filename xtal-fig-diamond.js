import { define } from 'carbon-copy/c-c.js';
import { html } from 'xtal-element/lib/html.js';
const mainTemplate = html `
<style>
:host{
    display:block;
}
#diamond {
    width: 80px; 
    height: 80px; 
    background: lightblue;
    margin: 3px 0 0 30px;
    /* Rotate */
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    /* Rotate Origin */
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
}

#inner{
    transform: rotate(45deg);
    position: absolute;
}
</style>
<div id=diamond>
    <div id=inner style="left:{{leftOffset}};top:{{topOffset}};">
        <slot></slot>
    </div>
</div>


`;
define('xtal-fig-diamond', mainTemplate, {
    stringProps: ['leftOffset', 'topOffset']
});
