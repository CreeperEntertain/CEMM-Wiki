(async () => {
    const scriptTag = document.currentScript;
    const htmlRef = scriptTag.dataset.template;
    const title = scriptTag.dataset.title;
    const property = scriptTag.dataset.property;
    const icon = scriptTag.dataset.icon;
    const value = scriptTag.dataset.value;

    const host = window.location.hostname;
    const isLocal = (host === "localhost" || host === "127.0.0.1");

    // Fetch the HTML file (just one, no replacements)
    const htmlResponse = await fetch(htmlRef);
    const sectionTemplate = await htmlResponse.text();

    let html = '';

    html += sectionTemplate
        .replace(/PLACEHOLDER_TITLE/g, title)
        .replace(/PLACEHOLDER_PROPERTY/g, property)
        .replace(/PLACEHOLDER_ICON/g, icon)
        .replace(/PLACEHOLDER_VALUE/g, value);

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