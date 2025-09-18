import { ContentTableRenderer } from "./renders/content tables.js";
export class ContentTable extends HTMLElement {
    jsonToAwait;

    static get observedAttributes() {
        return ['name'];
    }

    fileToAwait = '/html/templates/placed/content-table.html';

    constructor() {
        super();
        if(this.hasAttribute('name')){
            this.jsonToAwait = `content tables/${this.getAttribute('name')}.json`;
        }
        ContentTableRenderer.render(this, this.fileToAwait, this.jsonToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name' && newValue) {
            this.jsonToAwait = `/json/${newValue}.json`;
        }
        ContentTableRenderer.render(this, this.fileToAwait, this.jsonToAwait);
    }
}
customElements.define("content-table", ContentTable);