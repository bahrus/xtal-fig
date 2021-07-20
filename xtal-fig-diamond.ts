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
    display:block;
    --default-background-color:#dddddd;
    --default-border-color:transparent;
    --default-neg-width:-50px;
    --default-neg-half-width:calc(var(--default-neg-width) / 2);
    --default-pos-width:50px;
    --default-pos-half-width:calc(var(--default-pos-width) / 2);
    --default-border-style:solid;
    --border-width:var(--default-pos-width);
    --border-color:var(--default-border-color);
    --border-style:var(--default-border-style);
    --border-bottom-width: var(--default-pos-width);
    --border-bottom-color: var(--default-background-color);
    --border-bottom-style: solid;
    --top:var(--default-neg-width);
    --after-left:var(--default-neg-width);
    --after-top:var(--default-pos-width);
    --after-border-width:var(--default-pos-width);
    --after-border-style:var(--default-border-style);
    --after-border-color:var(--default-border-color);
    --after-border-top-width:var(--default-pos-width);
    --after-border-top-style:var(--default-border-style);
    --after-border-top-color:var(--default-background-color);
    --inner-left: var(--default-neg-half-width);
    --inner-min-height:var(--default-pos-width);
    --inner-top: var(--default-pos-half-width);
    --inner-width: var(--default-pos-width);
}
</style>
<style>
#diamond {
    width: 0;
    height: 0;
    border-style:var(--border-style);
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
    border-style:var(--after-border-style);
    border-color:var(--after-border-color);
    border-top-width: var(--after-border-width);
    border-top-style: var(--after-border-top-style);
    border-top-color: var(--after-border-top-color);
}

#inner{
    position:absolute;
    left: var(--inner-left);
    top:var(--inner-top);
    min-height:var(--inner-min-height);
    width:var(--inner-width);
    z-index: 1;
}
</style>
`;

define('xtal-fig-diamond', mainTemplate, {} as CCProps);