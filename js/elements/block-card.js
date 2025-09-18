import { BasicRenderer } from "./renders/basic.js";
export class BlockCard extends HTMLElement {
    static get observedAttributes() {
        return ['name'];
    }

    fileToAwait = '/html/templates/placed/block-card.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("block-card", BlockCard);