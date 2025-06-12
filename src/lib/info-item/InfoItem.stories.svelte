<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {iconArgType} from '$lib/icon/iconDefinition.js';
    import {InfoItem} from '$lib';

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Handson/InfoItem",
        component: InfoItem,
        tags: ["autodocs"],
        argTypes: {
            icon: iconArgType(),
            label: {
                control: "text",
            }
        },
        args: {
            icon: "info",
            label: "Label",
        },
    });
</script>

{#snippet content()}
    Information text here
{/snippet}
<Story name="Generic" args={{children: content}}/>
