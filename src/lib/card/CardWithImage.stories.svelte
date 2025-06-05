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
    import {AvatarList, Button, Chip, Headline, Icon, Typo} from '$lib';
</script>

<Story name="Generic" args={{}}>
    <CardWithImage src="https://picsum.photos/300/200" alt="A random image">
        {#snippet overlay()}
            <Chip type="filled" label="private"/>
        {/snippet}
        This is your card's content with an image.
    </CardWithImage>
</Story>

<Story name="Article">
    <CardWithImage src="https://picsum.photos/300/200" alt="A random image" style="max-width: 340px">
        {#snippet overlay()}
            <Chip label="private" icon="eyeOff"/>
        {/snippet}
        <Typo>
            <article class="size-m" style="display: flex; flex-direction: column; gap: 10px">
                <header>
                    <Headline size={'xl'} tag="h3">Title of content</Headline>
                    <!-- @todo replace this address block with the new InfoItem component -->
                    <address>
                        <Typo style="display: flex; align-items: center;font-style: normal; display: flex; flex-direction: row; gap: 5px">
                            <Icon icon="location"/>
                            Streetname 12, room XYZ
                        </Typo>
                    </address>
                </header>
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
                    <div style="display: flex; gap: 10px">
                        <!-- @todo replace these buttons with the ToggleButton component -->
                        <Button type="outlined" icon="heart" iconPosition="iconOnly"/>
                        <Button type="outlined" icon="save" iconPosition="iconOnly"/>
                    </div>
                </footer>
            </article>
        </Typo>
    </CardWithImage>
</Story>
