(async () => {
    const scriptTag = document.currentScript;
    const htmlRef = scriptTag.dataset.template;

    // Fetch the HTML file (just one, no replacements)
    const htmlResponse = await fetch('templates/placed/' + htmlRef + '.html');
    const html = await htmlResponse.text();

    // Insert the HTML before the current script tag
    scriptTag.insertAdjacentHTML('beforebegin', html);

    // Re-execute any <script> tags inside the inserted HTML
    const insertedScripts = [...scriptTag.parentElement.querySelectorAll('script[src], script:not([src])')];
    for (const oldScript of insertedScripts) {
        if (oldScript === scriptTag) continue;

        const newScript = document.createElement('script');
        // Copy attributes
        for (const { name, value } of oldScript.attributes) {
            newScript.setAttribute(name, value);
        }
        // Copy inline content if present
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    }

    // Remove the main script tag
    scriptTag.remove();
})();