# HAWK Svelte Components

A suite of Svelte components for use in HAWK projects, they are based on
the [Handson Design System](https://www.figma.com/design/SNtAs3qx6Xvp9yUSPb3vDB/Design-System-redesign). To see the components in action, check out the [Storybook](https://hawk-digital-environments.github.io/hawk-svelte-components); while you can find the source code at [GitHub](https://github.com/hawk-digital-environments/hawk-svelte-components).

## Installation

```bash
npm install @hawk-hhg/svelte-components
```

## Usage - Svelte

After you installed the library you first need to globally import the theme you want to use in your app.
The "HAWK" and the "HANDSON" themes are available; ONLY select one of them. Simply add the following
import to your '+layout.svelte' file:

**Headsup** We use the "reset" version of the themes, this means there is also a super slim css reset included.
If you do not want the reset, remove the "-reset" from the import; beware, there might be some visual glitches!

```svelte
<script context="module">
    // With reset (recommended for new projects)
    import '@hawk-hhg/svelte-components/theme-hawk-reset.css';
    // OR
    import '@hawk-hhg/svelte-components/theme-handson-reset.css';

    // Without reset (if you have issues with the reset)
    import '@hawk-hhg/svelte-components/theme-hawk.css';
    // OR
    import '@hawk-hhg/svelte-components/theme-handson.css';
</script>
```

Afterward you can import the components you want to use in your app. For example, if you want to use the Button
component, you can import it like this:

```svelte
<script>
    import {Button} from '@hawk-hhg/svelte-components';
</script>
<Button onclick={() => console.log('clicked')}>Click me!</Button>
```

## Usage - Web Components / Custom Elements

There are multiple components available as custom elements, which can be used in any web framework or even plain HTML.
To use the custom elements, you need to import the provided script and styles in your HTML file:

```html

<link rel="stylesheet" href="@hawk-hhg/svelte-components/theme-hawk-reset.css"/>
<script type="module" src="@hawk-hhg/svelte-components/custom-elements.js"></script>
```

The styles follow the same rules as the Svelte components, so you can choose between the "HAWK" and "HANDSON" themes.
The custom elements are automatically registered and lazy-loaded when they are used in the DOM.

So you can use the components like this:

```html

<hawk-button link="https://hawk.de">Click me!</button>
```

The elements do NOT render themselves in a shadow DOM, so you can style them with your own CSS.
The css of the elements themselves is scoped to the component, so you can use the same class names in your own CSS
without conflicts.

All [caveats](https://svelte.dev/docs/svelte/custom-elements#Caveats-and-limitations) of Svelte's custom elements apply.

### Custom features

We extended the default behaviors of svelte's custom elements to support some additional features
for more convenient usage.

#### Passing content (children)

As you can see, you can simply pass a value as content of the tag, which will be automatically
handled by the svelte component like you would have passed it as "children" prop.

#### Passing snippets to props

If the property can receive a snippet you are a bit out of luck in svelte's custom elements.
However, we added a special syntax to pass snippets to properties. Similar to how you would pass
slots to a component, you can pass snippets to properties by using the `<hawk-snippet>` tag.
It accepts a single `property` attribute, which is the name of the property you want to pass the snippet to.

```html

<hawk-input name="firstname">
    <hawk-snippet property="label">First <strong>Name</strong></hawk-snippet>
</hawk-input>
```

#### Flicker of unstyled content (FOUC) prevention

When using custom elements, there is a possibility of a flicker of unstyled content (FOUC) when the component is first rendered.
To prevent this you can include the `<link rel="stylesheet" href="@hawk-hhg/svelte-components/custom-elements-fouc.css"/>` in your page header.

This stylesheet contains styles that hide the custom elements until they are fully loaded and styled, preventing any unstyled content from being visible to the user.
Once the loading is complete, the elements will fade in smoothly, providing a better user experience.

### Supported components

Only the components that are listed below are available as custom elements.

- `hawk-button`
- `hawk-input`
- `hawk-input-password`
- `hawk-headline`
- `hawk-typo`
- `hawk-formwrap`
- `hawk-checkbox`
- `hawk-select`
- `hawk-footer`

### DEV-TIP: Adding custom elements:

If you want to upgrade a component to be useable as custom element, modify the `src/lib/custom-elements.ts` file,
by adding the components *TAG* as a key in the list, and the value to a function that returns
the dynamic import of the component's svelte file. For example:

```ts
autoloadCustomElements({
    'hawk-input': () => import('./lib/input/Input.svelte'),
    'hawk-button': () => import('./lib/button/Button.svelte'),
    // Add more components here...
});
```

Also, you need to add the "custom-element" option to the component's svelte file, like this:

```svelte
<svelte:options customElement={{
    shadow: 'none',
    extend: makeCustomComponent
}}/>
<script lang="ts">
    import {makeCustomComponent} from '$lib/util/makeCustomComponent.js';
    // Your component logic...
</script>
```

The "shadow" option is set to 'none' to ensure that the component does not render itself in a shadow DOM,
but is accessible in the global DOM. The `makeCustomComponent` function is a utility that handles
our custom features for the custom elements, like passing snippets to properties.

## Local development

To develop the components locally, clone the repository and run the following commands:

```bash
bin/env up
```

This will start the development environment and you can open the components in your browser by running:

```bash
bin/env open
```

## Postcardware

You're free to use this package, but if it makes it to your production environment we highly appreciate you sending us a
postcard from your hometown, mentioning which of our package(s) you are using.

```
HAWK Fakultät Gestaltung
Interaction Design Lab
Renatastraße 11
31134 Hildesheim
```

Thank you :D
