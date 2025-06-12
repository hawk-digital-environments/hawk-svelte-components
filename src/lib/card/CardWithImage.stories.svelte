<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {CardWithImage} from '$lib';

    const {Story} = defineMeta({
        title: 'Handson/CardWithImage',
        component: CardWithImage,
        tags: ['autodocs'],
        argTypes: {},
        args: {}
    });
</script>
<script>
    import {AvatarList, Button, Chip, Headline, Icon, InfoItem, Typo} from '$lib';
</script>


<Story name="Generic" args={{src: 'https://picsum.photos/300/200', alt: 'A random image'}}>
    {#snippet children(args)}
        <CardWithImage {...args}>
            {#snippet overlay()}
                <Chip label="private"/>
            {/snippet}
            This is your card's content with an image.
        </CardWithImage>
    {/snippet}
</Story>

<Story name="Link"
       args={{src: 'https://picsum.photos/300/200', alt: 'A random image', link: 'https://example.com', linkTarget: '_blank'}}>
    {#snippet children(args)}
        <CardWithImage {...args}>
            You can assign a link to a card, which will make it clickable and focusable like a button.
        </CardWithImage>
    {/snippet}
</Story>

{#snippet articleContent()}
    <Typo>
        <article class="size-m" style="display: flex; flex-direction: column; gap: 10px; max-width: 450px">
            <header>
                <Headline size={'xl'} tag="h3">Title of content</Headline>
            </header>
            <InfoItem icon="location">Streetname 12, room XYZ</InfoItem>
            <p>Croissant sweet roll tiramisu icing gummi bears gummi bears. Wafer chocolate cake chupa chups cookie
                gummies jelly in my belly.</p>
            <footer class="size-xs"
                    style="display: flex; justify-content: space-between; align-items: center; gap: 10px">
                <AvatarList size="small" avatars={[{
                    name: 'Prof. Dr. Annika Schmidt',
                    src: 'https://picsum.photos/80/80?random=1'
                },
                {
                    name: 'Jamalo Tayaro',
                    src: 'https://picsum.photos/80/80?random=2'
                },
                {
                    name: 'Miguel Gonzales',
                    src: 'https://picsum.photos/80/80?random=3'
                },
                ]}/>
                <p>Erstellt von <strong>Prof. Dr. Annika Schmidt</strong> und <strong>weiteren</strong></p>
                <div style="display: flex; gap: 10px" onclick={(e) => e.stopPropagation()}>
                    <!-- @todo replace these buttons with the ToggleButton component -->
                    <Button type="outlined" icon="heart" iconPosition="iconOnly"/>
                    <Button type="outlined" icon="save" iconPosition="iconOnly"/>
                </div>
            </footer>
        </article>
    </Typo>
{/snippet}

<Story name="Article" parameters={{controls: {disable: true}}}>
    <CardWithImage src="https://picsum.photos/300/200" alt="A random image">
        {#snippet overlay()}
            <Chip label="private" icon="eyeOff"/>
        {/snippet}
        {@render articleContent()}
    </CardWithImage>
</Story>

<Story name="Article (linked)" parameters={{controls: {disable: true}}}>
    <CardWithImage src="https://picsum.photos/300/200"
                   alt="A random image"
                   link="https://example.com"
                   linkTarget="_blank"
    >
        {#snippet overlay()}
            <Chip label="private" icon="eyeOff"/>
        {/snippet}
        {@render articleContent()}
    </CardWithImage>
</Story>
