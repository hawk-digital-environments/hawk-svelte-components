<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import { CardRadioGroup } from "$lib";

    import { mergeProps } from "$lib/util/mergeProps.js";
    import CardRadio from "./RadioCard.svelte";
    import { fn } from "@storybook/test";
    const { Story } = defineMeta({
        title: "Handson/CardRadioGroup",
        component: CardRadioGroup,
        tags: ["autodocs"],
        argTypes: {},
        args: {onchange:fn()}
    });
</script>
{#snippet radiocard()}

<CardRadio value="1">Value 1</CardRadio>
<CardRadio value="2">Value 2</CardRadio>
<CardRadio disabled value="3">Value 3</CardRadio>
{/snippet}
<Story name="Generic" args={{children: radiocard, value:"2"}}/>


