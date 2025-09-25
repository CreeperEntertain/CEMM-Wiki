export class FirstEntryRenderer {
    static async render(script, fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");
        const root = isLocal ? '' : '/CEMM-Wiki';

        const type = script.getAttribute('type');
        const name = script.getAttribute('name');
        const jsonToAwait = '/html/' + type + '/content tables/' + name + '.json';

        const htmlResponse = await fetch(root + fileToAwait);
        let html = await htmlResponse.text();
        const jsonResponse = await fetch(root + jsonToAwait);
        let json = await jsonResponse.json();
        let entry = json[0];
        
        const entryElement = '<entry-html type="${TYPE}" name="${NAME}" entry="${ENTRY}"></entry-html>';

        let insertedHtml = entryElement
            .replace(/\$\{TYPE\}/g, type)
            .replace(/\$\{NAME\}/g, name)
            .replace(/\$\{ENTRY\}/g, entry.toLowerCase());
        html = html
            .replace(/\$\{LINK\}/g, entry.toLowerCase())
            .replace(/\$\{ENTRY\}/g, entry)
            .replace(/\$\{INSERT\}/g, insertedHtml);
        
        script.innerHTML = html;
    }
}