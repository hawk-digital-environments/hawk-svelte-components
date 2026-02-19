<script module lang="ts">
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {CardRadio, CardRadioGroup} from '$lib';
    import {fn} from 'storybook/test';

    const {Story} = defineMeta({
        title: 'Handson/CardRadioGroup',
        component: CardRadioGroup,
        tags: ['autodocs'],
        argTypes: {},
        args: {onchange: fn()},
        subcomponents: {
            CardRadio: CardRadio as any
        }
    });
</script>

<Story name="Generic" args={{value:"2"}}>
    <CardRadio value="1">Value 1</CardRadio>
    <CardRadio value="2">Value 2</CardRadio>
    <CardRadio disabled value="3">Value 3</CardRadio>
</Story>
