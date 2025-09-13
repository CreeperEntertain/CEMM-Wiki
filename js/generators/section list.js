(async () => {
    const scriptTag = document.currentScript;
    const objectType = scriptTag.dataset.type;
    const fetchedList = '../json/' + objectType + '.json';

    // Fetch items and section template concurrently
    const [itemsResponse, templateResponse] = await Promise.all([
        fetch(fetchedList),
        fetch('templates/generated/section.html')
    ]);

    const items = (await itemsResponse.json()).sort((a, b) => a.localeCompare(b));
    const sectionTemplate = await templateResponse.text();

    let currentLetter = '';
    let html = '';

    for (const item of items) {
        const firstLetter = item[0].toUpperCase();
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;

            html += sectionTemplate
                .replace(/PLACEHOLDER_TYPE/g, objectType)
                .replace(/PLACEHOLDER_LOWER/g, currentLetter.toLowerCase())
                .replace(/PLACEHOLDER_TITLE/g, currentLetter) + '\n';
        }
    }

    // Insert generated HTML before the script tag
    scriptTag.insertAdjacentHTML('beforebegin', html);

    // Fix resource paths (scripts, images, etc.)
    const host = window.location.hostname;
    const isLocal = (host === "localhost" || host === "127.0.0.1");

    // Select all elements with a src attribute (script, img, iframe, etc.)
    const elementsWithSrc = scriptTag.parentElement.querySelectorAll("[src]");

    for (const el of elementsWithSrc) {
        if (el === scriptTag) continue;

        const srcValue = el.getAttribute("src");
        if (!isLocal && srcValue && !srcValue.startsWith("CEMM-Wiki/")) {
            el.setAttribute("src", "CEMM-Wiki/" + srcValue);
        }

        // Special handling for <script>: reload it to ensure execution
        if (el.tagName.toLowerCase() === "script") {
            const newScript = document.createElement("script");
            for (const { name, value } of el.attributes) {
                newScript.setAttribute(name, value);
            }
            newScript.textContent = el.textContent;
            el.replaceWith(newScript);
        }
    }

    // Remove the main script tag
    scriptTag.remove();
})();
