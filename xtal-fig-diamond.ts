import {define} from 'carbon-copy/c-c.js';
import {CCProps} from 'carbon-copy/types.d.js';
import {html} from 'xtal-element/lib/html.js';

const mainTemplate = html`
<div id=diamond>
    <div id=inner>
        <slot></slot>
    </div>
</div>
<style>
:host{
    --border-width:50px;
    --border-color:transparent;
    --border-bottom-width: 50px;
    --border-bottom-color: red;
    --border-bottom-style: solid;
    --top:-50px;
    --after-left:-50px;
    --after-top:50px;
    --after-border-width:50px;
    --after-border-top-width:50px;
}
</style>
<style>
#diamond {
    width: 0;
    height: 0;
    border-style:solid;
    border-color:var(--border-color);
    border-width:var(--border-width);
    border-bottom-width: var(--border-bottom-width);
    border-bottom-style: var(--border-bottom-style);
    border-bottom-color: var(--border-bottom-color);
    position: relative;
    top: var(--top);
}
#diamond:after {
    content: '';
    position: absolute;
    left: var(--after-left);
    top: var(--after-top);
    width: 0;
    height: 0;
    border-width: var(--after-border-width);
    border-style:solid;
    border-color:transparent;
    border-top-width: var(--after-border-width);
    border-top-style: solid;
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

define('xtal-fig-diamond', mainTemplate, {} as CCProps);