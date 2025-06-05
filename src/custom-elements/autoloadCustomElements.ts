export type CustomElementModule = { default: object & { element?: typeof HTMLElement } };
export type CustomElementList = Record<string, () => Promise<CustomElementModule>>;

export function autoloadCustomElements(elements: CustomElementList) {
    const loadedElements = new Set<string>();
    const missingElements = new Set<string>(Object.keys(elements));

    let loaderRunning = false;
    let rerunLoader = false;

    function loadMissingCustomElements() {
        if (loaderRunning) {
            rerunLoader = true;
            return;
        }

        if (missingElements.size === 0) {
            observer.disconnect();
            return;
        }

        loaderRunning = true;

        const promises = Array.from(missingElements).map(name => {
            const nodesInDocument = document.getElementsByTagName(name);
            if (nodesInDocument.length === 0 || loadedElements.has(name)) {
                return Promise.resolve();
            }

            return elements[name]().then((module) => {
                if (!module.default || !module.default.element) {
                    console.warn(`Custom element ${name} does not have a valid element export.`);
                    return;
                }
                customElements.define(name, module.default.element);
                loadedElements.add(name);
                missingElements.delete(name);
            }).catch((error) => {
                console.error(`Failed to load custom element ${name}:`, error);
            });
        });

        Promise.all(promises).then(() => {
            loaderRunning = false;
            if (rerunLoader) {
                rerunLoader = false;
                loadMissingCustomElements();
            }
        });
    }

    const observer = new MutationObserver(() => loadMissingCustomElements());

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    loadMissingCustomElements();

    return () => {
        observer.disconnect();
    };
}
