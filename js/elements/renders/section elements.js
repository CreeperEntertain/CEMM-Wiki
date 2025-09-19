export class SectionElementRenderer {
    static async render(script, fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");

        const type = script.getAttribute('type');

        const htmlResponse = await fetch(isLocal ? fileToAwait : '/CEMM-Wiki' + fileToAwait);
        let html = await htmlResponse.text();
        const jsonToAwait = '/json/' + type + '.json';
        const jsonResponse = await fetch(isLocal ? jsonToAwait : '/CEMM-Wiki' + jsonToAwait);
        let json = await jsonResponse.json();
        let sortedJson = json.sort((a, b) => a.localeCompare(b));
        let truncatedFirstCharacters = [...new Set(sortedJson.map(str => str[0]))];
        const animatedJsonToAwait = '/json/animated/' + type + '.json';
        const animatedJsonResponse = await fetch(isLocal ? animatedJsonToAwait : '/CEMM-Wiki' + animatedJsonToAwait);
        const animatedJson = await animatedJsonResponse.json();

        let listCard = '<list-card type="${TYPE}" title="${TITLE}" underscore="${UNDERSCORE}" lower="${LOWER}"></list-card>';

        let insertedHtml = '';
        for (const item of truncatedFirstCharacters)
        {
            let filteredBlockList = sortedJson.filter(str => str[0] === item);
            let finalizedListCardList = '';
            for (const filteredItem of filteredBlockList)
            {
                let underscore = filteredItem.toLowerCase().replace(/ /g, '_');
                let isAnimated = animatedJson.includes(filteredItem);
                finalizedListCardList += listCard
                    .replace(/\$\{TYPE\}/g, type)
                    .replace(/\$\{TITLE\}/g, filteredItem)
                    .replace(/\$\{LOWER\}/g, filteredItem.toLowerCase())
                    .replace(/\$\{UNDERSCORE\}/g, isAnimated ? 'gifs/' + underscore : underscore);
            }
            insertedHtml += html
                .replace(/\$\{TITLE\}/g, item)
                .replace(/\$\{LINK\}/g, item.toLowerCase())
                .replace(/\$\{INSERT\}/g, finalizedListCardList);
        }

        script.innerHTML = insertedHtml;
    }
}