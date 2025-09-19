export class FooterRenderer {
    static async render(script, fileToAwait, jsonToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");

        const htmlResponse = await fetch(isLocal ? fileToAwait : '/CEMM-Wiki' + fileToAwait);
        let origialHtml = await htmlResponse.text();
        const jsonResponse = await fetch(isLocal ? jsonToAwait : '/CEMM-Wiki' + jsonToAwait);
        let orignalJson = (await jsonResponse.json()).sort((a, b) => a.localeCompare(b));
        let sortedLetters = [...new Set(orignalJson.map(item => item[0]))];

        const letterElement = '<footer-letter link="#${LOWER}" title="${UPPER}"></footer-letter>';

        let insertHtml = '';
        for (const item of sortedLetters)
        {
            insertHtml += letterElement
                .replace(/\$\{LOWER\}/g, item.toLowerCase())
                .replace(/\$\{UPPER\}/g, item);
        }
        
        const finalHtml = origialHtml.replace(/\$\{INSERT\}/g, insertHtml)
        script.innerHTML = finalHtml;
    }
}