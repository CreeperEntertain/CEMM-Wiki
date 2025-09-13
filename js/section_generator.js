(async () => {
    const scriptTag = document.currentScript;
    const objectType = scriptTag.dataset.type;
    const fetchedList = '../../json/' + objectType + '.json';

    // Fetch items and section template concurrently
    const [itemsResponse, templateResponse] = await Promise.all([
        fetch(fetchedList),
        fetch('../templates/section.html')
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

    // Re-execute any <script src> tags inside inserted HTML
    for (const oldScript of [...scriptTag.parentElement.querySelectorAll('script[src]')]) {
        if (oldScript === scriptTag) continue;

        const newScript = document.createElement('script');
        for (const { name, value } of oldScript.attributes) {
            newScript.setAttribute(name, value);
        }
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    }

    // Remove the main script tag
    scriptTag.remove();
})();