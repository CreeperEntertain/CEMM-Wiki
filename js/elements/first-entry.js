import { FirstEntryRenderer } from "./renderers/first entry.js";
export class FirstEntry extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'name'];
    }

    fileToAwait = '/html/templates/placed/entry-element.html';

    constructor() {
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        FirstEntryRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("first-entry", FirstEntry);