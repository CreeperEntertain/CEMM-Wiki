(async () => {
    const scriptTag = document.currentScript;
    const htmlRef = scriptTag.dataset.template;
    const jsonReference = scriptTag.dataset.json;

    const host = window.location.hostname;
    const isLocal = (host === "localhost" || host === "127.0.0.1");

    const titleElement = '<script src="../../js/placers/block card.js" data-template="../../html/templates/generated/block card title.html" data-title="{$TITLE}"></script>';
    const propertyElement = '<script src="../../js/placers/block card.js" data-template="../../html/templates/generated/block card property.html" data-icon="{$ICON}" data-property="{$PROPERTY}"></script>';
    const valueElement = '<script src="../../js/generators/block card.js" data-template="../../html/templates/generated/block card value.html" data-value="{$VALUE}"></script>';
    const specialPropertyElement = '<script src="../../js/placers/block card.js" data-template="../../html/templates/generated/block card special property.html" data-icon="{$ICON}" data-property="{$PROPERTY}"></script>';
    
    // Fetch the HTML file (just one, no replacements)
    const htmlResponse = await fetch(htmlRef);
    const sectionTemplate = await htmlResponse.text();

    let html = '';

    html += sectionTemplate.replace(/PLACEHOLDER_TITLE/g, jsonReference); // Does nothing for now lol

    // Insert the HTML before the current script tag
    scriptTag.insertAdjacentHTML('beforebegin', html);

    // Re-execute any <script> tags inside the inserted HTML
    for (const oldScript of [...scriptTag.parentElement.querySelectorAll("script[src]")]) {
        if (oldScript === scriptTag) continue;
        const newScript = document.createElement("script");
        for (const { name, value } of oldScript.attributes) {
            newScript.setAttribute(name, value);
        }
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    }

    // Remove the main script tag
    scriptTag.remove();
})();