<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {Textarea} from '$lib';

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
        args: {
            label: 'Label'
        }
    });
</script>

<Story name="Generic" args={{}}/>
<Story name="Placeholder" args={{placeholder: 'Placeholder'}}/>
<Story name="With value" args={{value: 'This is a value, which is set, for this textarea'}}/>
<Story name="Description" args={{description: 'This is an error'}}/>
<Story name="Error" args={{error: 'This is an error'}}/>
<Story name="Required" args={{required: true}}/>
<Story name="Disabled" args={{disabled: true}}/>
<Story name="Size" args={{rows: 10}}/>
