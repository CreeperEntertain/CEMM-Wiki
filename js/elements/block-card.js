import { BlockCardRenderer } from "./renderers/block card.js";
export class BlockCard extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'name'];
    }

    fileToAwait = '/html/templates/placed/block-card.html';

    constructor() {
        super();
        BlockCardRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BlockCardRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("block-card", BlockCard);