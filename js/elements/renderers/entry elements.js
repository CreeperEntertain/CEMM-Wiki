export class EntriesRenderer {
    static async render(script, fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");
        const root = isLocal ? '' : '/CEMM-Wiki';

        const name = script.getAttribute('name');
        const lower = name.toLowerCase();
        const type = script.getAttribute('type');

        const htmlResponse = await fetch(root + fileToAwait);
        let html = await htmlResponse.text();
        const jsonResponse = await fetch(root + '/html/' + type + '/content tables/' + lower + '.json');
        let json = await jsonResponse.json();
        json.shift();

        const replacements = {
            NAME: name || '',
            TYPE: type || ''
        };

        for (const [key, value] of Object.entries(replacements)) {
            const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
            html = html.replace(regex, value);
        }

        const entryElement = '<entry-html type="${TYPE}" name="${NAME}" entry="${ENTRY}"></entry-html>';
        let insertedHtml = '';
        for (const item of json)
        {
            let insertedEntryElement = entryElement
                .replace(/\$\{TYPE\}/g, type)
                .replace(/\$\{NAME\}/g, lower)
                .replace(/\$\{ENTRY\}/g, item.toLowerCase());
            insertedHtml += html
                .replace(/\$\{ENTRY\}/g, item)
                .replace(/\$\{LINK\}/g, item.toLowerCase())
                .replace(/\$\{INSERT\}/g, insertedEntryElement);
        }
        
        script.innerHTML = insertedHtml;
    }
}