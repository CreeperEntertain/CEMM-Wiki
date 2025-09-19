export class SideCardRender {
    static async render(script, fileToAwait, jsonToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");

        const htmlResponse = await fetch(isLocal ? fileToAwait : '/CEMM-Wiki' + fileToAwait);
        let originalHtml = await htmlResponse.text();
        const jsonResponse = await fetch(isLocal ? jsonToAwait : '/CEMM-Wiki' + jsonToAwait);
        let json = await jsonResponse.json();

        const sideCardElement = '<side-card-element icon="${ICON}" text="${TEXT}" link="${LINK}"></side-card-element>';

        let insertHtml = '';
        for (const item of json)
        {
            insertHtml += sideCardElement
                .replace(/\$\{ICON\}/g, item[0])
                .replace(/\$\{TEXT\}/g, item[1])
                .replace(/\$\{LINK\}/g, item[2]);
        }
        
        script.innerHTML = originalHtml.replace(/\$\{INSERT\}/g, insertHtml);
    }
}