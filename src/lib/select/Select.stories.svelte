<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Select from './Select.svelte';
    import {iconArgType} from '../icon/iconDefinition.js';

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
        args: {}
    });
</script>

<Story name="Generic" args={{
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
        {value: 'lemon', label: 'Lime 🍋'},
    ]
}}/>
