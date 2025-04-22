<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import RadioGroup from './RadioGroup.svelte';

    const {Story} = defineMeta({
        title: 'Handson/RadioGroup',
        component: RadioGroup,
        tags: ['autodocs'],
        argTypes: {},
        args: {
            options: [
                {label: 'Option 1', value: '1'},
                {label: 'Option 2', value: '2'},
                {label: 'Option 3', value: '3'}
            ]
        }
    });
</script>

<Story name="Generic" args={{}}/>
