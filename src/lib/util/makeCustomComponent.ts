import {createRawSnippet, type Snippet} from 'svelte';

/**
 * A companion function for svelte's custom elements that allows extended snippet support for all properties.
 * To use the function, simply add it to your "customElement" option in your component:
 *
 * ```svelte
 * <svelte:options customElement={{
 *     shadow: 'none',
 *     extend: makeCustomComponent // Note: This is the important part! Do not add braces!
 * }}/>
 * <script lang="ts">
 *     import {makeCustomComponent} from '$lib/util/makeCustomComponent.js';
 * </script>
 * ````
 *
 * After that your component will automatically support every snippet you through at it.
 * - "children" will contain all child nodes of the component, that are not explicitly marked as snippets.
 *   Example: <hawk-your-component>This is my <strong>child</strong> node</hawk-your-component>
 *      -> "children" will contain a renderable Svelte snippet with the content: "This is my <strong>child</strong> node".
 * - You can also add `<hawk-snippet property="propertyName">` tags to your component, which will be automatically filtered
 *   out of the "children" property and added to the component as a property with the name "propertyName".
 *   Example: <hawk-your-component><hawk-snippet property="mySnippet">This is my snippet</hawk-snippet></hawk-your-component>
 *      -> "mySnippet" will be a renderable Svelte snippet with the content: "This is my snippet".
 *
 * You can mix and match these two features as you like, but be aware, that all nodes are MOVED into the snippets,
 * so you can not render the same snippet multiple times, which you normally can do with Svelte snippets.
 *
 * @param baseClass
 */
export function makeCustomComponent(baseClass: new () => HTMLElement): new () => HTMLElement {
    return class CustomComponent extends baseClass {
        private readonly _snippetStorage: Record<string, HTMLDivElement> = {};

        constructor() {
            super();
            const childStorage = this._getStorage('children');
            childStorage.append(...this.childNodes);

            // Extract all snippets into their own dedicated storage
            for (const snippet of childStorage.querySelectorAll('& > hawk-snippet')) {
                const name = snippet.getAttribute('property') || '';
                if (name) {
                    console.log('Storing snippet under property:', name, [...snippet.childNodes], 'of', this);
                    this._getStorage(name).append(...snippet.childNodes);
                } else {
                    console.warn('Snippet without property attribute found:', snippet);
                }
                snippet.remove();
            }

            console.log(this._snippetStorage);
        }

        get children() {
            const mixedSnippet = propertySnippetFactory(this._getStorage('children')) as Snippet & HTMLCollection;

            const children = super.children;

            return new Proxy(mixedSnippet, {
                get(target, prop) {
                    const propNumber = Number(prop);
                    if (propNumber > -1 && !isNaN(propNumber)) {
                        if (propNumber < children.length) {
                            return children[propNumber];
                        }
                        return undefined;
                    }
                    if (prop in target) {
                        return target[propNumber];
                    }
                    return undefined;
                },
                has(target, prop) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        return Number(prop) < children.length;
                    }
                    return prop in children || prop in target;
                },
                getOwnPropertyDescriptor(target, prop) {
                    if (prop in children) {
                        return Object.getOwnPropertyDescriptor(children, prop);
                    }
                    return Object.getOwnPropertyDescriptor(target, prop);
                },
                ownKeys(target) {
                    return [...Object.keys(children), ...Reflect.ownKeys(target)];
                }
            });
        }

        private _getStorage(property: string): HTMLDivElement {
            if (!this._snippetStorage[property]) {
                this._snippetStorage[property] = document.createElement('div');
                if (property !== 'children') {
                    (this as any)[property] = propertySnippetFactory(this._snippetStorage[property]);
                }
            }
            return this._snippetStorage[property];
        }
    };
}

function propertySnippetFactory(storage: HTMLDivElement): Snippet {
    return createRawSnippet(() => {
        return {
            render: () => `<div class="hawk-custom-element"></div>`,
            setup: (target) => {
                target.append(...storage.childNodes);
                console.log('CREATED WRAPPER', target);
                return () => {
                    storage.append(...target.childNodes);
                };
            }
        };
    });
}
