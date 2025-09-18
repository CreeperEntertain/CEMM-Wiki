export class TitleElement extends HTMLElement {
    constructor() {
        super();
        const fileToAwait = '/js/elements/containers/title-element';
        this.render(fileToAwait);
    }

    async render(fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");
        const response = await fetch(isLocal ? fileToAwait : 'CEMM-Wiki/' + fileToAwait);
        const html = await response.text();
        this.innerHTML = html;
    }
} customElements.define("title-element", TitleElement);