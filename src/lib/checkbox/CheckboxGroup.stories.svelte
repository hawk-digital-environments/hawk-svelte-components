<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import CheckboxGroup from './CheckboxGroup.svelte';
    import {mergeProps} from '../util/mergeProps.js';

    const {Story} = defineMeta({
        title: 'Handson/CheckboxGroup',
        component: CheckboxGroup,
        tags: ['autodocs'],
        argTypes: {
            orientation: {
                control: {type: 'radio'},
                options: ['vertical', 'horizontal']
            },
            labelPosition: {
                control: {type: 'radio'},
                options: ['left', 'right']
            }
        },
        args: {
            options: [
                {'label': 'Option 1', 'value': '1'},
                {'label': 'Option 2', 'value': '2'},
                {'label': 'Option 3', 'value': '3'}
            ]
        }
    });
</script>

<Story name="Generic" args={{}}/>
<Story name="Selected" args={{value: ['1', '3']}}/>
<Story name="Horizontal" args={{orientation: 'horizontal'}}/>
<Story name="Label Positions" args={{}} parameters={{controls: {exclude: ['labelPosition']}}}>
    {#snippet children({id, ...args})}
        <CheckboxGroup {...mergeProps(args, {labelPosition: 'left'})}/>
        <CheckboxGroup {...mergeProps(args, {labelPosition: 'right'})}/>
    {/snippet}
</Story>
<Story name="Extreme label length" args={{
    options: [
                {label: 'Option 1', value: '1'},
                {
                    label: 'Option 2 mit richtig langem Label das wirklich lang ist und über mehrere Zeilen gehen wird',
                    value: '2'
                },
                {label: 'Option 3', value: '3', disabled: true}
            ]
}}/>
<Story name="Extreme option count" args={{
    orientation: 'horizontal',
    options: [
            {label: 'Option 1', value: '1'},
            {label: 'Option 2', value: '2'},
            {label: 'Option 3', value: '3', disabled: true},
            {label: 'Option 4', value: '4'},
            {label: 'Option 5', value: '5'},
            {label: 'Option 6', value: '6'},
            {label: 'Option 7', value: '7'},
            {label: 'Option 8', value: '8'},
            {label: 'Option 9', value: '9'},
            {label: 'Option 10', value: '10'},
            {label: 'Option 11', value: '11'},
            {label: 'Option 12', value: '12'},
        ]
}}/>
