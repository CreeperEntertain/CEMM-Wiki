import { BasicRenderer } from "./renderers/basic.js";
export class EntryHtml extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'name', 'entry'];
    }

    constructor() {
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const type = this.getAttribute('type');
        const nameAtt = this.getAttribute('name');
        const entry = this.getAttribute('entry');
        const fileToAwait = '/html/' + type + '/entries/' + nameAtt + '/' + entry + '.html';
        
        BasicRenderer.render(this, fileToAwait);
    }
}
customElements.define("entry-html", EntryHtml);