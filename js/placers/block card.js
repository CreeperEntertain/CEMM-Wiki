(async () => {
    const scriptTag = document.currentScript;
    const htmlRef = scriptTag.dataset.template;
    const title = scriptTag.dataset.title;
    const property = scriptTag.dataset.property;
    const icon = scriptTag.dataset.icon;
    const value = scriptTag.dataset.value;

    const valueElement = '<script src="../../js/placers/direct link.js" data-template="../../html/templates/generated/block card value.html" data-text="{$VALUE}"></script>';

    const host = window.location.hostname;
    const isLocal = (host === "localhost" || host === "127.0.0.1");

    // Fetch the HTML file (just one, no replacements)
    const htmlResponse = await fetch(htmlRef);
    const sectionTemplate = await htmlResponse.text();

    let html = '';

    html += sectionTemplate
        .replace(/PLACEHOLDER_TITLE/g, title)
        .replace(/PLACEHOLDER_PROPERTY/g, property)
        .replace(/PLACEHOLDER_ICON/g, icon);

    let htmlValues = '';
    if (Array.isArray(value)) {
        // If it's already an array, map each entry
        htmlValues = value.map(v => 
            valueElement.replace('{$VALUE}', v)
        ).join('');
    } else if (typeof value === 'string') {
        // If it's a string, check if it contains commas (to treat as multiple values)
        const valuesArray = value.includes(',') ? value.split(',') : [value];
        htmlValues = valuesArray.map(v => 
            valueElement.replace('{$VALUE}', v.trim())
        ).join('');
    }
    // Replace the placeholder in your HTML
    html = html.replace(/PLACEHOLDER_HTML_VALUES/g, htmlValues);

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