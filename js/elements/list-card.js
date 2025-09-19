import { BasicRenderer } from "./renders/basic.js";
export class ListCard extends HTMLElement {
    static get observedAttributes() {
        ['type', 'lower', 'underscore', 'title']
    }

    fileToAwait = '/html/templates/generated/list-card.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("list-card", ListCard);