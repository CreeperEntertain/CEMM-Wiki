export class BasicRenderer {
    static async render(script, fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");

        const response = await fetch(isLocal ? fileToAwait : '/CEMM-Wiki' + fileToAwait);
        let html = await response.text();

        const replacements = {
            TEXT: script.getAttribute('text') || '',
            TITLE: script.getAttribute('title') || '',
            ICON: script.getAttribute('icon') || '',
            NAME: script.getAttribute('name') || '',
            TEMPLATE: script.getAttribute('template') || '',
            LINK: script.getAttribute('link') || ''
        };

        for (const [key, value] of Object.entries(replacements)) {
            const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
            html = html.replace(regex, value);
        }

        html = html.replace(/\$\{ROOT\}/g, isLocal ? '/' : '/CEMM-Wiki/');
        
        script.innerHTML = html;
    }
}