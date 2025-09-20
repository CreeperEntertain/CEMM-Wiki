import { ContentTableRenderer } from "./renderers/content tables.js";
export class ContentTable extends HTMLElement {
    jsonToAwait;

    static get observedAttributes() {
        return ['name'];
    }

    fileToAwait = '/html/templates/placed/content-table.html';

    constructor() {
        super();
        if(this.hasAttribute('name')){
            let name = this.getAttribute('name')
            this.jsonToAwait = 'content tables/' + name + '.json';
        }
        ContentTableRenderer.render(this, this.fileToAwait, this.jsonToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name' && newValue) {
            let name = this.getAttribute('name')
            this.jsonToAwait = 'content tables/' + name + '.json';
        }
        ContentTableRenderer.render(this, this.fileToAwait, this.jsonToAwait);
    }
}
customElements.define("content-table", ContentTable);