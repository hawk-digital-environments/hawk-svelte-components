<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.js';
    import style from './Headline.module.sass';

    interface Props extends HTMLAttributes<HTMLHeadingElement | HTMLSpanElement> {
        /**
         * Defines the size of the headline (which implicitly defines the tag if not provided).
         * If omitted, the tag will determine the size.
         */
        size?: 'l' | 'xl' | 'xxl' | 'm' | 's' | 'xs';

        /**
         * Defines the tag to use for the headline.
         * The size implicitly defines this if not provided.
         */
        tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
    }

    const {
        size: givenSize,
        tag: givenTag,
        children,
        ...restProps
    }: Props = $props();

    const sizeToTagMap = {
        xxl: 'h1',
        xl: 'h2',
        l: 'h3',
        m: 'h4',
        s: 'h5',
        xs: 'h6'
    };

    const size = $derived.by(() => {
        if (givenSize) {
            return givenSize;
        }
        const sizeFromTag = Object.keys(sizeToTagMap).find(key => sizeToTagMap[key] === givenTag);
        return sizeFromTag ?? 'l';
    });

    const tag = $derived.by(() => {
        if (givenTag) {
            return givenTag;
        }
        return sizeToTagMap[size] ?? 'h3';
    });
</script>
<svelte:element this={tag} {...mergeProps(restProps, {class: [style.headline, style[size] ?? style.l]})}>
    {@render children?.()}
</svelte:element>
