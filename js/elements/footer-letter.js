import { BasicRenderer } from "./renders/basic.js";
export class FooterLetter extends HTMLElement {
    static get observedAttributes() {
        return ['link', 'title'];
    }

    fileToAwait = '/html/templates/generated/footer-letter.html';

    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("footer-letter", FooterLetter);