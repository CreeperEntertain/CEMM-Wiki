import { FooterRenderer } from "./renders/footer.js";
export class Footer extends HTMLElement {
    static get observedAttributes() {
        return ['type'];
    }

    fileToAwait = '/html/templates/placed/footer-element.html';
    jsonToAwait = '/json/' + this.getAttribute('type') + '.json';

    constructor() {
        super();
        FooterRenderer.render(this, this.fileToAwait, this.jsonToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        FooterRenderer.render(this, this.fileToAwait, this.jsonToAwait);
    }
}
customElements.define("footer-element", Footer);