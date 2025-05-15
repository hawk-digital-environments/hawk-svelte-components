<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {Link} from '$lib';

    /**
     * A simple link component that can be used to navigate to a different page or open a new tab.
     * It supports all the standard anchor tag attributes and adds some additional functionality like disabling the link and preventing tabnabbing when opening a new tab.
     * There is no visual styling applied to this component, it is meant to be used as a base for more complex link components.
     * It supports a "disabled" prop that will functionally disable the link.
     */
    const {Story} = defineMeta({
        title: 'Handson/Util/Link',
        component: Link,
        tags: ['autodocs'],
        argTypes: {},
        args: {}
    });
</script>

{#snippet children()}
    Link Label
{/snippet}

<Story name="Primary" args={{ children: children }}/>
