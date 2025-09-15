(async () => {
    const scriptTag = document.currentScript;
    const jsonList = scriptTag.dataset.json;
    const fetchedList = 'content tables/' + jsonList + '.json';

    // Fetch items and section template concurrently
    const [itemsResponse, templateResponse] = await Promise.all([
        fetch(fetchedList),
        fetch('../templates/generated/content table entry.html')
    ]);

    const items = await itemsResponse.json();
    const sectionTemplate = await templateResponse.text();

    let html = '';

    html += sectionTemplate
        .replace(/PLACEHOLDER_TITLE/g, 'Top')
        .replace(/PLACEHOLDER_LOWER/g, '');

    for (const item of items) {
        html += sectionTemplate
            .replace(/PLACEHOLDER_TITLE/g, item)
            .replace(/PLACEHOLDER_LOWER/g, item.toLowerCase());
    }

    // Insert generated HTML before the script tag
    scriptTag.insertAdjacentHTML('beforebegin', html);

    // Re-execute any <script src> tags inside inserted HTML
    const host = window.location.hostname;
    const isLocal = (host === "localhost" || host === "127.0.0.1");
    for (const oldScript of [...scriptTag.parentElement.querySelectorAll("script[src]")]) {
        if (oldScript === scriptTag) continue;
        const newScript = document.createElement("script");
        for (const { name, value } of oldScript.attributes) {
            if (!isLocal && name === "src") {
                let newValue = value;
                // Only prepend if it doesn't already start with "CEMM-Wiki/"
                if (!newValue.startsWith("CEMM-Wiki/")) {
                    newValue = "CEMM-Wiki/" + newValue;
                }
                newScript.setAttribute(name, newValue);
            } else {
                newScript.setAttribute(name, value);
            }
        }
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    }

    // Remove the main script tag
    scriptTag.remove();
})();