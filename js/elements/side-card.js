import { BasicRenderer } from "./renders/basic.js";
export class SideCard extends HTMLElement {
    fileToAwait = '/html/templates/placed/side-card.html';
    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("side-card", SideCard);