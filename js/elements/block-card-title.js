import { BasicRenderer } from "./renderers/basic.js";
export class BlockCardTitle extends HTMLElement {
    static get observedAttributes() {
        return ['title'];
    }

    fileToAwait = '/html/templates/generated/block cards/block-card-title.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("block-card-title", BlockCardTitle);