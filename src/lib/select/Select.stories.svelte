<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Select from './Select.svelte';
    import {iconArgType} from '../icon/iconDefinition.js';
    import {mergeProps} from '../util/mergeProps.js';

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

<Story name="Generic" args={{}}/>

<Story name="Sizing" args={{iconLeft: 'externalLink', iconRight: 'star', required: true}}
       parameters={{controls: {exclude: ['label', 'value']}}}>
    {#snippet children({id, value, ...args})}
        <div style="width: 400px; display: flex; gap: 20px; flex-direction: column; margin-bottom: 20px">
            <Select {...mergeProps(
                args,
                {value: 'apple'}
            )}/>
        </div>
        <div style="width: 100%; display: flex; gap: 20px; flex-direction: column">
            <Select {...mergeProps(
                args,
                {value: 'lemon'}
            )}/>
        </div>
    {/snippet}
</Story>
