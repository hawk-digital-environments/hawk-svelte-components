<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {fn} from 'storybook/test';
    import {InfoIcon} from '$lib';

    /**
     * The info icon is a simple button that displays an info icon and can be clicked to trigger an action.
     * It is used inside the "card" component to show additional information.
     */
    const {Story} = defineMeta({
        title: 'Handson/Util/InfoIcon',
        component: InfoIcon,
        tags: ['autodocs'],
        argTypes: {},
        args: {
            onclick: fn(),
            title: 'Additional Information'
        }
    });
</script>

<Story name="Generic" args={{}}/>
