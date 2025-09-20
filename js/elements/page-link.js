import { BasicRenderer } from "./renderers/basic.js";
export class PageLink extends HTMLElement {
    static get observedAttributes() {
        return ['text', 'link'];
    }

    fileToAwait = '/html/templates/placed/page-link.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("page-link", PageLink);