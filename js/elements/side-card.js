import { SideCardRender } from "./renders/side card.js";
export class SideCard extends HTMLElement {
    fileToAwait = '/html/templates/placed/side-card.html';
    jsonToAwait = '/json/side card elements.json';

    constructor() {
        super();
        SideCardRender.render(this, this.fileToAwait, this.jsonToAwait);
    }
}
customElements.define("side-card", SideCard);