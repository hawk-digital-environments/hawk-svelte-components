<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './Card.module.sass';
    import {mergeProps} from '$lib/util/mergeProps.js';

    export interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * An optional link to navigate to, if set the card can be focused and clicked like a button
         */
        link?: string;

        /**
         * The target of the link, defaults to "_self". Omitted when the button is not a link
         */
        linkTarget?: string;
    }

    let {
        children,
        link,
        linkTarget,
        onclick: givenOnClick,
        ...restProps
    }: Props = $props();

    const isClickable = $derived(typeof givenOnClick === 'function' || !!link);
    const triggerAction = $derived((e: MouseEvent | KeyboardEvent) => {
        if (isClickable) {
            givenOnClick?.(e as any);
            if (link) {
                window.open(link, linkTarget || '_self');
            }
        }
    });
    const onKeyDown = $derived((e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            triggerAction(e);
        }
    });
</script>

<div {...mergeProps(
    {
        class: [style.card, isClickable ? style.link : null],
        onclick: triggerAction,
        onkeydown: onKeyDown,
        tabindex: isClickable ? '0' : undefined,
    },
    restProps
)}>
    {@render children?.()}
</div>
