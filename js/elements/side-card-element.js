import { BasicRenderer } from "./renders/basic.js";
export class SideCardElement extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'text', 'link'];
    }

    fileToAwait = '/html/templates/generated/side-card-element.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("side-card-element", SideCardElement);