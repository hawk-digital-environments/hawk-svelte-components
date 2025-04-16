<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Textarea from './Textarea.svelte';

    /**
     * The formwrap component is a wrapper for form elements that adds some spacing and padding to the elements.
     * Usage is advised, but not required.
     */
    const {Story} = defineMeta({
        title: 'Handson/Textarea',
        component: Textarea,
        tags: ['autodocs'],
        argTypes: {
            label: {control: {type: 'text'}},
            error: {control: {type: 'text'}},
            description: {control: {type: 'text'}}
        },
        args: {}
    });
</script>

<Story name="Generic" args={{}}/>
<Story name="Error" args={{error: 'This is an error', label: 'Label'}}/>
<Story name="Size" args={{rows: 10, label: 'Label'}}/>
