import { PageTemplateRenderer } from "./renderers/page template.js";
export class PageTemplate extends HTMLElement {
    fileToAwait = '/html/templates/placed/page-template.html';

    constructor() {
        super();
        PageTemplateRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("page-template", PageTemplate);