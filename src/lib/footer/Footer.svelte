<svelte:options customElement={{
    shadow: 'none',
    extend: makeCustomComponent
}}/>
<script lang="ts">
    import style from './Footer.module.sass';
    import {makeCustomComponent} from '$lib/util/makeCustomComponent.js';
    import type {HTMLAttributes} from 'svelte/elements';
    import type {Snippet} from 'svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import Typo from '$lib/typo/Typo.svelte';
    import Headline from '$lib/headline/Headline.svelte';

    interface Props extends HTMLAttributes<HTMLElement> {
        children: Snippet;
        /**
         * The headline is the main title of the footer, which is typically used to display the name of the organization or company that owns the website.
         */
        headline?: string;
        /**
         * The subheadline is a secondary title that provides additional information about the organization or company, such as its location or a brief description of its services.
         *
         */
        subHeadline?: string;
    }

    const {
        headline = '©HAWK Hochschule',
        subHeadline='Hildesheim/Holzminden/Göttingen',
        children,
        ...restProps
    }: Props = $props();
</script>

<footer {...mergeProps(
    restProps,
    {
        class: style.footer
    }
)}>
    <div class={style.headlineContainer}>
        <Headline size="xs" tag="span" class={style.headlinePart}>{headline}</Headline>
        <Headline size="xs" tag="span" class={style.headlinePart}>{subHeadline}</Headline>
    </div>
    <div class={style.content}>
        <Typo>
            {@render children?.()}
        </Typo>
    </div>
</footer>
