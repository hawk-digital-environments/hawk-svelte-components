<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {Headline} from '$lib';

    const {Story} = defineMeta({
        title: 'Handson/Headline',
        component: Headline,
        tags: ['autodocs'],
        argTypes: {},
        args: {}
    });
</script>

<Story name="Generic" args={{}}>
    {#snippet template(args)}
        <Headline {...args}>Super fancy Headline; Hello!</Headline>
    {/snippet}
</Story>
<Story name="Sizes by Tag" args={{}} parameters={{controls: {disable: true}}}>
    <Headline tag="h1">Heading 1 (xl)</Headline>
    <Headline tag="h2">Heading 2 (l)</Headline>
    <Headline tag="h3">Heading 3 (m)</Headline>
    <Headline tag="h4">Heading 4 (s)</Headline>
    <Headline tag="h5">Heading 5 (xs)</Headline>
    <Headline tag="h6">Heading 6 (xs)</Headline>
    <Headline tag="span">Span as Heading 3 (m)</Headline>
</Story>
<Story name="Tags by Size" args={{}} parameters={{controls: {disable: true}}}>
    <Headline size="xl">Heading 1 (xl)</Headline>
    <Headline size="l">Heading 2 (l)</Headline>
    <Headline size="m">Heading 3 (m)</Headline>
    <Headline size="s">Heading 4 (s)</Headline>
    <Headline size="xs">Heading 5/6 (xs)</Headline>
</Story>
