<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {InputPassword} from '$lib';

    const {Story} = defineMeta({
        title: 'Handson/InputPassword',
        component: InputPassword,
        tags: ['autodocs'],
        argTypes: {
            label: {control: {type: 'text'}},
            error: {control: {type: 'text'}},
            description: {control: {type: 'text'}}
        },
        args: {},
        parameters: {}
    });
</script>
<Story name="Generic" args={{label: 'Password'}}/>
