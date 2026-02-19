<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {Illustration, illustrationArgType} from '$lib';

    /**
     * Illustrations are similar to icons, but they are more complex and usually larger.
     * They also come only in one size and are not meant to be resized.
     */
    const {Story} = defineMeta({
        title: 'Handson/Illustration',
        component: Illustration,
        tags: ['autodocs'],
        argTypes: {
            icon: illustrationArgType()
        },
        args: {
            icon: 'location'
        }
    });
</script>
<script>
    import {allowedIllustrationNames} from '$lib';
</script>

<Story name="Generic" args={{}}/>
<Story name="All Illustrations" parameters={{controls: {disable: true}}}>
    {#snippet template()}
        <div style="display: flex; max-width: 100%; width: 600px; gap: 20px; flex-wrap: wrap">
            {#each allowedIllustrationNames as iconName}
                <div>
                    <Illustration icon={iconName}/>
                </div>
            {/each}
        </div>
    {/snippet}
</Story>
