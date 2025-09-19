import { BasicRenderer } from "./renderers/basic.js";
export class ImageCard extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'text', 'title'];
    }

    fileToAwait = '/html/templates/placed/image-card.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("image-card", ImageCard);