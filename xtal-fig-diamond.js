import { define } from 'carbon-copy/c-c.js';
import { html } from 'xtal-element/lib/html.js';
const mainTemlate = html `
<div id=diamond>
    <div id=inner>
        <slot></slot>
    </div>
</div>
<style>
:host{
    --h-dimension:50px;
    --v-dimension:50px;
}
#diamond {

    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom-color: red;
    position: relative;
    top: -50px;
}
#diamond:after {
    content: '';
    position: absolute;
    left: -50px;
    top: 50px;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top-color: red;
}
#inner{
    position:absolute;
    left: -25px;
    top:25px;
    min-height:50px;
    width:50px;
    z-index: 1;
    
}
</style>
`;
define('xtal-fig-diamond', mainTemlate, {});
