<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import ChipList from './ChipList.svelte';
    import {fn} from '@storybook/test';

    const {Story} = defineMeta({
        title: 'Handson/ChipList',
        component: ChipList,
        tags: ['autodocs'],
        argTypes: {},
        args: {
            chips: [
                {
                    label: 'Apple 🍎'
                },
                {
                    label: 'Peach 🍑',
                    onaddclick: fn(() => console.log('onaddclick: Peach'))
                },
                {
                    label: 'Potato 🥔',
                    onremoveclick: fn(() => console.log('onremoveclick: Potato'))
                },
                {
                    label: 'Pear 🍐',
                    onaddclick: fn(() => console.log('onaddclick: Pear')),
                    disabled: true
                }
            ]
        }
    });
</script>

<Story name="Generic" args={{}}/>
<Story name="Disabled" args={{disabled: true}}/>
