import {define} from 'carbon-copy/c-c.js';
import {CCProps} from 'carbon-copy/types.d.js';
import {html} from 'xtal-element/lib/html.js';

const mainTemplate = html`
<style>
    :host{
        --inner-left-offset:24px;
        --inner-top-offset:24px;
        --diamond-background: lightblue;
    }
</style>
<style>
:host{
    display:block;
}
#diamond {
    width: 100%; 
    height: 100%; 
    background: var(--diamond-background);
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
    left:var(--inner-left-offset);
    top:var(--inner-top-offset);
}
</style>
<div id=diamond part=outer>
    <div id=inner part=inner>
        <slot></slot>
    </div>
</div>


`;

define('xtal-fig-diamond', mainTemplate, {} as CCProps);