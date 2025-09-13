(async () => {
    const scriptTag = document.currentScript;
    const htmlRef = scriptTag.dataset.template;

    // Fetch the HTML file (just one, no replacements)
    const htmlResponse = await fetch('templates/placed/' + htmlRef + '.html');
    const html = await htmlResponse.text();

    // Insert the HTML before the current script tag
    scriptTag.insertAdjacentHTML('beforebegin', html);

    const host = window.location.hostname;
    const isLocal = (host === "localhost" || host === "127.0.0.1");

    // Adjust paths in inserted content
    if (!isLocal) {
        const container = scriptTag.parentElement;

        // Elements and their attributes to check
        const attrMap = {
            "script": "src",
            "img": "src",
            "link": "href",
            "video": "src",
            "audio": "src",
            "source": "src"
        };

        for (const [tag, attr] of Object.entries(attrMap)) {
            for (const el of container.querySelectorAll(`${tag}[${attr}]`)) {
                let val = el.getAttribute(attr);
                if (val && !val.startsWith("http") && !val.startsWith("/") && !val.startsWith("CEMM-Wiki/")) {
                    el.setAttribute(attr, "CEMM-Wiki/" + val);
                }
            }
        }
    }

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
