<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {fn} from '@storybook/test';
    import {ChipList} from '$lib';

    const {Story} = defineMeta({
        title: 'Handson/ChipList',
        component: ChipList,
        tags: ['autodocs'],
        argTypes: {
          type: {
            control: {type: 'select', options: ['outlined', 'filled', 'filled-light']},
            description: 'The visual type of the chips in the list. If not set, the default type of the Chip component will be used.'
          },
        },
        args: {
            chips: [
                {
                    label: 'Apple 🍎',
                    type: 'filled',
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
