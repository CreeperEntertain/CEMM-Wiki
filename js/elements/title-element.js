export class TitleElement extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    async render() {
        const response = await fetch('/CEMM-Wiki/js/elements/containers/title-element');
        const html = await response.text();
        this.innerHTML = html;
    }
} customElements.define("title-element", TitleElement);