(async () => {
    const scriptTag = document.currentScript;
    const objectType = scriptTag.dataset.type;

    // Base path relative to GitHub Pages repo
    const repoBase = window.location.pathname.replace(/\/[^\/]*$/, '/');
    const fetchedList = new URL(`../json/${objectType}.json`, window.location.origin + repoBase).href;
    const templatePath = new URL('templates/generated/section.html', window.location.origin + repoBase).href;

    // Fetch items and template concurrently
    const [itemsResponse, templateResponse] = await Promise.all([
        fetch(fetchedList),
        fetch(templatePath)
    ]);

    if (!itemsResponse.ok) {
        console.error('Failed to fetch JSON:', itemsResponse.status);
        return;
    }

    if (!templateResponse.ok) {
        console.error('Failed to fetch template:', templateResponse.status);
        return;
    }

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

    // Re-execute <script> tags inside inserted HTML
    const insertedScripts = [...scriptTag.parentElement.querySelectorAll('script')].filter(s => s !== scriptTag);
    for (const oldScript of insertedScripts) {
        const newScript = document.createElement('script');

        // Copy all attributes
        for (const { name, value } of oldScript.attributes) {
            newScript.setAttribute(name, value);
        }

        if (oldScript.src) {
            // Ensure relative src resolves correctly
            newScript.src = new URL(oldScript.src, window.location.href).href;
        } else {
            newScript.textContent = oldScript.textContent;
        }

        oldScript.replaceWith(newScript);
    }

    // Remove the main script tag
    scriptTag.remove();
})();