(async () => {
    const scriptTag = document.currentScript;
    const charFilter = (scriptTag.dataset.char || '').toUpperCase();
    const objectType = scriptTag.dataset.type;
    const fetchedList = '../json/' + objectType + '.json';

    // Fetch JSON and template concurrently
    const [items, template] = await Promise.all([
        fetch(fetchedList).then(res => res.json()),
        fetch('templates/generated/card.html').then(res => res.text())
    ]);

    // Generate HTML for filtered items
    const html = items
        .filter(item => item.charAt(0).toUpperCase() === charFilter)
        .map(item => {
            const lowercase = item.toLowerCase();
            const underscore = lowercase.replace(/ /g, '_');
            return template
                .replace(/PLACEHOLDER_LOWERCASE/g, lowercase)
                .replace(/PLACEHOLDER_UNDERSCORE/g, underscore)
                .replace(/PLACEHOLDER_TITLE/g, item)
                .replace(/PLACEHOLDER_TYPE/g, objectType);
        })
        .join('');

    scriptTag.insertAdjacentHTML('beforebegin', html);
    scriptTag.remove();
})();