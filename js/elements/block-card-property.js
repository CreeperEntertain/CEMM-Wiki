import { BlockCardPropertyRenderer } from "./renderers/block card property.js";
export class BlockCardProperty extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'property', 'json-array'];
    }

    fileToAwait = '/html/templates/generated/block cards/block-card-property.html';

    constructor() {
        super();
        BlockCardPropertyRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BlockCardPropertyRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("block-card-property", BlockCardProperty);