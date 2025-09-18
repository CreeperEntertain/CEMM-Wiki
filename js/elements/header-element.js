import { BasicRenderer } from "./renders/basic.js";
export class Header extends HTMLElement {
    fileToAwait = '/html/templates/placed/header-element.html';
    constructor() {
        super();
        BasicRenderer.render(this, this.fileToAwait);
    }
}
customElements.define("header-element", Header);