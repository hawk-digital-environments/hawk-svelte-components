# HAWK Svelte Components

A suite of Svelte components for use in HAWK projects, they are based on
the [Handson Design System](https://www.figma.com/design/SNtAs3qx6Xvp9yUSPb3vDB/Design-System-redesign).

## Installation

```bash
npm install @hawk-hhg/svelte-components
```

## Usage

After you installed the library you first need to globally import the theme you want to use in your app.
The "HAWK" and the "HANDSON" themes are available; ONLY select one of them. Simply add the following
import to your '+layout.svelte' file:

**Headsup** We use the "reset" version of the themes, this means there is also a super slim css reset included.
If you do not want the reset, remove the "-reset" from the import; beware, there might be some visual glitches!

```svelte
<script context="module">
    // With reset (recommended for new projects)
    import '@hawk-hhg/svelte-components/theme-hawk-reset.js';
    // OR
    import '@hawk-hhg/svelte-components/theme-handson-reset.js';

    // Without reset (if you have issues with the reset)
    import '@hawk-hhg/svelte-components/theme-hawk.js';
    // OR
    import '@hawk-hhg/svelte-components/theme-handson.js';
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
