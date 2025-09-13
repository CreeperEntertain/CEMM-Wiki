export function executeTemplateScripts(root = document) {
    const scripts = [...root.querySelectorAll('script[src], script:not([src])')];
    for (const oldScript of scripts) {
        const newScript = document.createElement('script');
        // Copy all attributes
        for (const { name, value } of oldScript.attributes) {
            newScript.setAttribute(name, value);
        }
        // Copy inline content
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    }
}