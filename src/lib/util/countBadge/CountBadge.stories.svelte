<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {CountBadge} from '$lib';

    const {Story} = defineMeta({
        title: 'Handson/Util/CountBadge',
        component: CountBadge,
        tags: ['autodocs'],
        argTypes: {},
        args: {}
    });
</script>

<Story name="Generic" args={{}} parameters={{controls: {disable: true}}} asChild={true}>
    <div style="display: flex; gap: 1rem; flex-direction: column">
        <CountBadge count={5}/>
        <CountBadge count={-3}/>
        <CountBadge count={0}/>
        <CountBadge count={100}/>
        <CountBadge count={10000}/>
    </div>
</Story>
