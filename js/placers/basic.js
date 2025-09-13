(async () => {
    const scriptTag = document.currentScript;
    const htmlRef = scriptTag.dataset.template;

    // Fetch the HTML file (just one, no replacements)
    const htmlResponse = await fetch('templates/placed/' + htmlRef + '.html');
    const html = await htmlResponse.text();

    // Insert the HTML before the current script tag
    scriptTag.insertAdjacentHTML('beforebegin', html);

    // Re-execute any <script> tags inside the inserted HTML
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