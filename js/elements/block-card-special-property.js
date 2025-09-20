import { BasicRenderer } from "./renderers/basic.js";
export class BlockCardSpecialProperty extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'property'];
    }

    fileToAwait = '/html/templates/generated/block cards/block-card-special-property.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("block-card-special-property", BlockCardSpecialProperty);