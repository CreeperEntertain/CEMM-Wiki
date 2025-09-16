(async () => {
    const scriptTag = document.currentScript;
    const htmlRef = scriptTag.dataset.template;
    const objectType = scriptTag.dataset.type;
    const displayText = scriptTag.dataset.text;
    const pageLink = scriptTag.dataset.link;
    const iconLink = scriptTag.dataset.icon;
    const title = scriptTag.dataset.title;

    const host = window.location.hostname;
    const isLocal = (host === "localhost" || host === "127.0.0.1");

    // Fetch the HTML file (just one, no replacements)
    const htmlResponse = await fetch(htmlRef);
    const sectionTemplate = await htmlResponse.text();

    let html = '';

    html += sectionTemplate
        .replace(/PLACEHOLDER_TYPE/g, objectType)
        .replace(/PLACEHOLDER_ROOT/g, isLocal ? '/' : '/CEMM-Wiki/')
        .replace(/PLACEHOLDER_TEXT/g, displayText)
        .replace(/PLACEHOLDER_LOWER/g, (displayText || "").toLowerCase())
        .replace(/PLACEHOLDER_LINK/g, pageLink)
        .replace(/PLACEHOLDER_ICON/g, iconLink)
        .replace(/PLACEHOLDER_TITLE/g, title);

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