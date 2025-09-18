export class TitleElement extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    async render() {
        const response = await fetch('/js/elements/containers/title-element.html');
        const html = await response.text();
        // Inject directly into the custom element itself
        this.innerHTML = html;
    }
} customElements.define("title-element", TitleElement);