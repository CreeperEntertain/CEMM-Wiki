import { BasicRenderer } from "./renderers/basic.js";
export class ContentTableEntry extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'link'];
    }

    fileToAwait = '/html/templates/generated/content-table-entry.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("content-table-entry", ContentTableEntry);