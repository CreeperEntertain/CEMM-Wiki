export class BasicRenderer
{
    static async render(innerHTML, fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");
        const response = await fetch(isLocal ? fileToAwait : 'CEMM-Wiki/' + fileToAwait);
        const html = await response.text();
        innerHTML = html;
    }
}