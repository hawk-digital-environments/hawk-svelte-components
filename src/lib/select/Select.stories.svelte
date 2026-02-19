<script module lang="ts">
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {iconArgType, Select} from '$lib';

    const {Story} = defineMeta({
        title: 'Handson/Select',
        component: Select,
        tags: ['autodocs'],
        argTypes: {
            label: {control: {type: 'text'}},
            error: {control: {type: 'text'}},
            description: {control: {type: 'text'}},
            icon: iconArgType()
        },
        args: {
            label: 'label',
            options: [
                {value: 'apple', label: 'Apfel 🍎'},
                {value: 'peach', label: 'Pfirsich 🍑'},
                {value: 'potato', label: 'Kartoffel 🥔'},
                {value: 'pear', label: 'Birne 🍐', disabled: true},
                {value: 'grapes', label: 'Traube 🍇'},
                {value: 'banana', label: 'Banane 🍌'},
                {value: 'kiwi', label: 'Kiwi 🥝'},
                {value: 'pineapple', label: 'Ananas 🍍'},
                {value: 'orange', label: 'Orange 🍊'},
                {value: 'lemon', label: 'Lime 🍋'}
            ]
        }
    });
</script>
<script>
    import {fn} from 'storybook/test';
</script>

<Story name="Generic" args={{}}/>
<Story name="Selected" args={{value: 'banana'}}/>
<Story name="Disabled Options"
       args={{options: [{label: 'Enabled', value: 'enabled'}, {label: 'Disabled', value: 'disabled', disabled: true}]}}/>
<Story name="Placeholder" args={{placeholder: 'Select something'}}/>
<Story name="Icon" args={{icon: 'eye'}}/>
<Story name="Error" args={{error: 'Please select something'}}/>
<Story name="Description" args={{description: 'A select field'}}/>
<Story name="Required" args={{required: true}}/>
<Story name="Disabled" args={{disabled: true}}/>
<Story name="Block" args={{block: true}}/>
<Story name="Change Handler" args={{onchange: fn()}}/>
<Story name="Extreme Labels" args={{
    icon: 'externalLink',
    required: true,
    value: 'extremely-long',
    options: [
        {label: 'Short label', value: 'short'},
        {label: 'A very long label that should be wrapped', value: 'long'},
        {label: 'An extremely long label that should be wrapped, if possible on multiple lines with a nice layout to it', value: 'extremely-long' },
    ]
}}
       parameters={{controls: {exclude: ['label', 'value']}}}>
    {#snippet template({id, ...args})}
        <div style="width: 400px; display: flex; gap: 20px; flex-direction: column; margin-bottom: 20px">
            <Select {...args as any}/>
        </div>
        <div style="width: 100%; display: flex; gap: 20px; flex-direction: column">
            <Select {...(args as any)}/>
        </div>
    {/snippet}
</Story>
