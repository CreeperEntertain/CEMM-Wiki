import { SectionElementRenderer } from "./renders/section elements.js";
export class SectionElement extends HTMLElement {
    static get observedAttributes() {
        ['type']
    }

    fileToAwait = '/html/templates/generated/section-element.html';

    constructor() {
        super();
        SectionElementRenderer.render(this, this.fileToAwait);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        SectionElementRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("section-element", SectionElement);