import { BasicRenderer } from "./renders/basic.js";
export class PageBodyTitle extends HTMLElement {
    static get observedAttributes() {
        return ['name'];
    }

    fileToAwait = '/html/templates/placed/page-body-title.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("page-body-title", PageBodyTitle);