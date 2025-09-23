export class PageTemplateRenderer {
    static async render(script, fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");
        const root = isLocal ? '/' : '/CEMM-Wiki/';

        const response = await fetch(isLocal ? fileToAwait : '/CEMM-Wiki' + fileToAwait);
        let html = await response.text();

        const url = window.location.href;
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname.replace(/%20/g, ' ');

        const directory = pathname.substring(0, pathname.lastIndexOf('/'));
        const type = directory.substring(directory.lastIndexOf('/') + 1);
        const typeShortened = type.slice(0, -1);
        const nameLower = pathname.substring(pathname.lastIndexOf('/') + 1).replace(/.html/g, '');
        const name = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

        html = html
            .replace(/\$\{ROOT\}/g, root)
            .replace(/\$\{TYPE\}/g, type)
            .replace(/\$\{SHORTTYPE\}/g, typeShortened)
            .replace(/\$\{NAME\}/g, name)
            .replace(/\$\{NAMELOWER\}/g, nameLower);
        
        script.innerHTML = html;
    }
}