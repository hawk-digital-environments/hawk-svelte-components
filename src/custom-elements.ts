import {autoloadCustomElements} from './custom-elements/autoloadCustomElements.js';
import {registerSnippetComponent} from './custom-elements/registerSnippetComponent.js';

registerSnippetComponent();
autoloadCustomElements({
    'hawk-input': () => import('./lib/input/Input.svelte'),
    'hawk-input-password': () => import('./lib/input/InputPassword.svelte'),
    'hawk-button': () => import('./lib/button/Button.svelte'),
    'hawk-typo': () => import('./lib/typo/Typo.svelte'),
    'hawk-headline': () => import('./lib/headline/Headline.svelte'),
    'hawk-formwrap': () => import('./lib/formwrap/Formwrap.svelte'),
    'hawk-checkbox': () => import('./lib/checkbox/Checkbox.svelte'),
    'hawk-select': () => import('./lib/select/Select.svelte'),
    'hawk-footer': () => import('./lib/footer/Footer.svelte'),
});
