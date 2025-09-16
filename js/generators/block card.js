(async () => {
    const scriptTag = document.currentScript;
    const htmlRef = scriptTag.dataset.template;
    const jsonReference = 'block cards/' + scriptTag.dataset.json + '.json';

    const response = await fetch(jsonReference);
    const jsonData = await response.json();

    const titleElement = '<script src="../../js/placers/block card.js" data-template="../../html/templates/generated/block card title.html" data-title="{$TITLE}"></script>';
    const propertyElement = '<script src="../../js/placers/block card.js" data-template="../../html/templates/generated/block card property.html" data-icon="{$ICON}" data-property="{$PROPERTY}" data-value="{$VALUE}"></script>';
    const specialPropertyElement = '<script src="../../js/placers/block card.js" data-template="../../html/templates/generated/block card special property.html" data-icon="{$ICON}" data-property="{$SPECIAL_PROPERTY}"></script>';

    // Fetch the HTML template for sections
    const htmlResponse = await fetch(htmlRef);
    const sectionTemplate = await htmlResponse.text();

    // Container for all generated HTML
    let finalHTML = '';

    // Loop through each section in the JSON
    for (const sectionObj of jsonData) {
        const sectionTitle = Object.keys(sectionObj)[0];
        const sectionItems = sectionObj[sectionTitle];

        // Insert title
        const titleHTML = titleElement.replace('{$TITLE}', sectionTitle);
        finalHTML += titleHTML;

        for (const item of sectionItems) {
            if (item.length === 2) {
                // Special property
                const spHTML = specialPropertyElement
                    .replace('{$ICON}', item[0])
                    .replace('{$SPECIAL_PROPERTY}', item[1]);
                finalHTML += spHTML;
            } else if (item.length === 3) {
                // Property + values
                let propertyHTML = propertyElement
                    .replace('{$ICON}', item[0])
                    .replace('{$PROPERTY}', item[1])
                    .replace('{$VALUE}', item[2]);

                // Insert property + its value(s) at once
                finalHTML += propertyHTML;
            }
        }
    }

    // Insert all HTML before the main script
    scriptTag.insertAdjacentHTML('beforebegin', finalHTML);

    // Execute any remaining scripts in the inserted HTML
    for (const oldScript of [...scriptTag.parentElement.querySelectorAll("script[src]")]) {
        if (oldScript === scriptTag) continue;
        const newScript = document.createElement("script");
        for (const { name, value } of oldScript.attributes) newScript.setAttribute(name, value);
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    }

    // Remove the main script tag
    scriptTag.remove();
})();