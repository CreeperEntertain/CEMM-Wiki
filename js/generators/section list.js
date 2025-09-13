(async () => {
    const scriptTag = document.currentScript;
    const objectType = scriptTag.dataset.type;

    // Base URL of your repo on GitHub Pages
    const repoBase = '/CEMM-Wiki/';

    // Correct paths to JSON and template
    const fetchedList = repoBase + 'json/' + objectType + '.json';
    const templatePath = repoBase + 'templates/generated/section.html';

    try {
        // Fetch items and template concurrently
        const [itemsResponse, templateResponse] = await Promise.all([
            fetch(fetchedList),
            fetch(templatePath)
        ]);

        if (!itemsResponse.ok) throw new Error('Failed to fetch JSON: ' + itemsResponse.status);
        if (!templateResponse.ok) throw new Error('Failed to fetch template: ' + templateResponse.status);

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

        // Create a container for the generated HTML
        const container = document.createElement('div');
        container.innerHTML = html;

        // Insert container into the DOM before the main script tag
        scriptTag.insertAdjacentElement('beforebegin', container);

        // Replace and execute any <script> tags inside the container safely
        container.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');

            // Copy all attributes
            for (const { name, value } of oldScript.attributes) {
                newScript.setAttribute(name, value);
            }

            if (oldScript.src) {
                // Resolve relative src URLs correctly
                newScript.src = new URL(oldScript.src, window.location.href).href;
            } else {
                newScript.textContent = oldScript.textContent;
            }

            oldScript.replaceWith(newScript); // Replace inline or src script
        });

        // Remove the main generator script
        scriptTag.remove();

    } catch (err) {
        console.error('Error loading items:', err);
    }
})();