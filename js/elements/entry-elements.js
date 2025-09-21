import { EntriesRenderer } from "./renderers/entry elements.js";
export class Entries extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'type'];
    }

    fileToAwait = '/html/templates/placed/entry-element.html';

    constructor() {
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        EntriesRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("entry-elements", Entries);