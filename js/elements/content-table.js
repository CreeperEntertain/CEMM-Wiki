import { BasicRenderer } from "./renders/basic.js";
export class ContentTable extends HTMLElement {
    static get observedAttributes() {
        return ['name'];
    }

    fileToAwait = '/html/templates/placed/content-table.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("content-table", ContentTable);