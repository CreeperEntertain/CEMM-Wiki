export class BlockCardPropertyRenderer {
    static async render(script, fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");

        const response = await fetch(isLocal ? fileToAwait : '/CEMM-Wiki' + fileToAwait);
        let html = await response.text();

        const replacements = {
            ICON: script.getAttribute('icon') || '',
            PROPERTY: script.getAttribute('property') || ''
        };

        for (const [key, value] of Object.entries(replacements)) {
            const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
            html = html.replace(regex, value);
        }

        html = html.replace(/\$\{ROOT\}/g, isLocal ? '/' : '/CEMM-Wiki/');
        
        const htmlBlock = '<block-card-value text="${TEXT}"></block-card-value>';
        let jsonArray = JSON.parse(script.getAttribute('json-array').replace(/'/g, '"'));
        let insertedHtml = '';
        for (const item of jsonArray)
        {
            insertedHtml += htmlBlock.replace(/\$\{TEXT\}/g, item) + '\n';
        }
        
        script.innerHTML = html.replace(/\$\{INSERT\}/g, insertedHtml);
    }
}