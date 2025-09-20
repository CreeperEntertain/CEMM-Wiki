export class BlockCardRenderer {
    static async render(script, fileToAwait) {
        const host = window.location.hostname;
        const isLocal = (host === "localhost" || host === "127.0.0.1");
        const root = isLocal ? '' : '/CEMM-Wiki';

        const name = script.getAttribute('name');
        const type = script.getAttribute('type');
        const jsonToAwait = '/html/' + type + '/' + type.substring(0, type.length - 1) + ' cards/' + name + '.json';

        const htmlResponse = await fetch(root + fileToAwait);
        let html = await htmlResponse.text();
        const jsonResponse = await fetch(root + jsonToAwait);
        let json = await jsonResponse.json();
        const animatedJsonResponse = await fetch(root + '/json/animated/' + type + '.json');
        let animatedJsonLower = JSON.parse(JSON.stringify(await animatedJsonResponse.json()).toLowerCase());
        
        const isAnimated = animatedJsonLower.includes(name);
        const underscoredName = name.replace(/ /g, '_');
        html = html
            .replace(/\$\{ROOT\}/g, root + '/')
            .replace(/\$\{NAME\}/g, isAnimated ? 'gifs/' + underscoredName : underscoredName)
            .replace(/\$\{TYPE\}/g, type);

        let titleElement = '<block-card-title title="${TITLE}"></block-card-title>';
        let propertyElement = '<block-card-property icon="${ICON}" property="${PROPERTY}" json-array="${JSONARRAY}"></block-card-property>';
        let specialPropertyElement = '<block-card-special-property icon="${ICON}" property="${PROPERTY}"></block-card-special-property>';

        let insertedHtml = '';
        for (const blockCardSection of json)
        {
            var title = Object.keys(blockCardSection)[0];
            insertedHtml += titleElement.replace(/\$\{TITLE\}/g, title) + '\n';
            var contents = Object.values(blockCardSection)[0];
            for (const blockCardProperty of contents)
            {
                let isSpecialProperty = (blockCardProperty.length === 2);
                if (isSpecialProperty)
                {
                    insertedHtml += specialPropertyElement
                        .replace(/\$\{ICON\}/g, blockCardProperty[0])
                        .replace(/\$\{PROPERTY\}/g, blockCardProperty[1]);
                }
                else
                {
                    let convertedThirdEntry = JSON.stringify(blockCardProperty[2])
                        .replace(/\"/g, '\'')
                        .replace(/\[/g, '')
                        .replace(/\]/g, '');
                    convertedThirdEntry = '[' + convertedThirdEntry + ']';
                    insertedHtml += propertyElement
                        .replace(/\$\{ICON\}/g, blockCardProperty[0])
                        .replace(/\$\{PROPERTY\}/g, blockCardProperty[1])
                        .replace(/\$\{JSONARRAY\}/g, convertedThirdEntry);
                }
            }
        }
        
        script.innerHTML = html.replace(/\$\{INSERT\}/g, insertedHtml);
    }
}