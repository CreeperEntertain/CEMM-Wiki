import { BasicRenderer } from "./renderers/basic.js";
export class BlockCardValue extends HTMLElement {
    static get observedAttributes() {
        return ['text'];
    }

    fileToAwait = '/html/templates/generated/block cards/block-card-value.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("block-card-value", BlockCardValue);