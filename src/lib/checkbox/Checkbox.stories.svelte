<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {Checkbox} from '$lib';
    import {mergeProps} from '$lib/util/mergeProps.js';

    const {Story} = defineMeta({
        title: 'Handson/Checkbox',
        component: Checkbox,
        tags: ['autodocs'],
        argTypes: {
            label: {control: {type: 'text'}},
            labelPosition: {options: ['left', 'right'], control: 'radio'}
        },
        args: {
            label: 'Checkbox',
            value: 'test'
        }
    });
</script>

<Story name="Generic" args={{}}/>
<Story name="Checked" args={{checked: true}}/>
<Story name="Required" args={{required: true}}/>
<Story name="Disabled" args={{disabled: true}}/>
<Story name="Label Positions" args={{}} parameters={{controls: {exclude: ['labelPosition']}}}>
    {#snippet children({id, ...args})}
        <Checkbox {...mergeProps(args, {labelPosition: 'left'})}/>
        <Checkbox {...mergeProps(args, {labelPosition: 'right'})}/>
    {/snippet}
</Story>
