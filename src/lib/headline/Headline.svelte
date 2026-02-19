<svelte:options customElement={{
    shadow: 'none',
    extend: makeCustomComponent
}}/>
<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './Headline.module.sass';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import {makeCustomComponent} from '$lib/util/makeCustomComponent.js';

    interface Props extends HTMLAttributes<HTMLHeadingElement | HTMLSpanElement> {
        /**
         * Defines the size of the headline (which implicitly defines the tag if not provided).
         * If omitted, the tag will determine the size.
         */
        size?: 'l' | 'xl' | 'm' | 's' | 'xs';

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


    const tagToSizeMap = {
        h1: 'xl',
        h2: 'l',
        h3: 'm',
        h4: 's',
        h5: 'xs',
        h6: 'xs',
        span: 'm'
    };

    const size = $derived.by(() => {
        if (givenSize) {
            // Legacy support for xxl -> which now renders as xl
            if((givenSize as string) === 'xxl'){
                console.warn('The size "xxl" on a Headline is deprecated and automatically mapped to "xl". Please update your code to use "xl" instead of "xxl".');
                return 'xl';
            }
            return givenSize;
        }
        const sizeFromTag = tagToSizeMap[givenTag as keyof typeof tagToSizeMap];
        return sizeFromTag ?? tagToSizeMap['h3'];
    });

    const tag = $derived.by(() => {
        if (givenTag) {
            return givenTag;
        }
        const tagFromSize = Object.entries(tagToSizeMap).find(([_, s]) => s === size)?.[0];
        return tagFromSize ?? 'h3';
    });
</script>
<svelte:element this={tag} {...mergeProps(restProps, {class: [style.headline, style[size] ?? style.l]})}>
    {@render children?.()}
</svelte:element>
