export class HTMLHAWKSnippetElement extends HTMLSpanElement {

}

export function registerSnippetComponent() {
    if (customElements.get('hawk-snippet')) {
        return;
    }
    customElements.define('hawk-snippet', HTMLHAWKSnippetElement, {
        extends: 'span'
    });
}
