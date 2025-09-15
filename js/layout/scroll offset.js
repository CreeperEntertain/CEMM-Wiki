async function setScrollOffset() {
    const scriptTag = document.currentScript;
    const objectType = scriptTag.dataset.type;
    const objectName = scriptTag.dataset.name;

    try {
        // fetch the JSON file
        const response = await fetch('../' + objectType + '/content tables/' + objectName + '.json');
        const data = await response.json();

        // number of items in the JSON
        const count = data.length;

        // calculate your offset (example: 100px per item)
        const offset = (count + 1) * 35 + 125;

        // set it as a CSS variable globally
        document.documentElement.style.setProperty("--scroll-offset", offset + "px");
    } catch (err) {
        console.error("Failed to set scroll offset:", err);
    }
}

setScrollOffset();