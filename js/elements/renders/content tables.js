export class ContentTableRenderer {
    static async render(script, fileToAwait, jsonToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");

        const response = await fetch(isLocal ? fileToAwait : '/CEMM-Wiki' + fileToAwait);
        let html = await response.text();
        const contentTableRaw = await fetch(jsonToAwait);
        let contentTable = await contentTableRaw.json();
        console.log(contentTable);

        const contentTableEntry = '<content-table-entry title="${TITLE}" link="#${LINK}"></content-table-entry>';

        let contentTableFinal = contentTableEntry.replace(/\$\{TITLE\}/g, 'Top').replace(/\$\{LINK\}/g, '');
        for (const item of contentTable)
        {
            contentTableFinal += contentTableEntry.replace(/\$\{TITLE\}/g, item).replace(/\$\{LINK\}/g, item.toLowerCase());
        }

        html = html.replace(/\$\{ENTRIES\}/g, contentTableFinal);
        
        script.innerHTML = html;
    }
}