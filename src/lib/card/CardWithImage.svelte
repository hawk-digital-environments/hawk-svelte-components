<script lang="ts">
    import style from './CardWithImage.module.sass';

    import {Card} from '$lib';
    import type {HTMLAttributes} from 'svelte/elements';
    import type {Snippet} from 'svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * Image source URL for the card.
         */
        src?: string;

        /**
         * Image alt text for accessibility.
         */
        alt?: string;

        /**
         * Additional props to apply to the image element.
         */
        imageProps?: Partial<HTMLAttributes<HTMLImageElement>>;

        /**
         * An optional content to render in the top right corner of the image.
         * This is useful for placing "chips" or other small elements over the image.
         */
        overlay?: Snippet;
    }

    const {
        src,
        alt,
        overlay,
        children,
        imageProps = {},
        ...restProps
    }: Props = $props();
</script>

<Card {...restProps}>
    <div class={style.image_container}>
        <img {...mergeProps({src, alt, class: style.image}, imageProps)}/>
        {#if overlay}
            <div class={style.overlay}>
                {@render overlay?.()}
            </div>
        {/if}
    </div>
    {@render children?.()}
</Card>
