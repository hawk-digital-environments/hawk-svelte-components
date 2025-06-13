<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './Card.module.sass';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import InfoIcon from '$lib/util/infoIcon/InfoIcon.svelte';
    import CountBadge from '$lib/util/countBadge/CountBadge.svelte';

    export interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * An optional link to navigate to, if set the card can be focused and clicked like a button
         */
        link?: string;

        /**
         * The target of the link, defaults to "_self". Omitted when the button is not a link
         */
        linkTarget?: string;

        /**
         * If true, the card will be disabled and not clickable.
         */
        disabled?: boolean;

        /**
         * If given, an "info" icon will be shown in the top right corner of the card.
         */
        oninfoclick?: () => void;

        /**
         * An optional title to show when hovering the info icon.
         * This is only relevant if `oninfoclick` is set.
         */
        infoTitle?: string;

        /**
         * An optional text to show in the top right corner of the card.
         * Note, you can only set either `oninfoclick` or `infoText`, not both.
         * If both are present, `oninfoclick` will take precedence and `infoText` will be ignored.
         */
        infoText?: string;

        /**
         * An optional count to show in the bottom right corner of the card.
         * This is useful to show the number of items related to the card.
         */
        count?: number;

        /**
         * An optional title to show when hovering the count badge.
         * This is useful to provide additional context for the count.
         * This is only relevant if `count` is set.
         */
        countTitle?: string;
    }

    let {
        children,
        link,
        linkTarget,
        onclick: givenOnClick,
        disabled = false,
        oninfoclick,
        infoTitle,
        infoText,
        count,
        countTitle,
        ...restProps
    }: Props = $props();

    const isClickable = $derived(!disabled && (typeof givenOnClick === 'function' || !!link));
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
        class: [
            style.card,
            isClickable && style.link,
            disabled && style.disabled
        ],
        onclick: triggerAction,
        onkeydown: onKeyDown,
        tabindex: isClickable ? '0' : undefined,
        'aria-disabled': disabled ? 'true' : undefined
    },
    restProps
)}>
    {#if oninfoclick}
        <InfoIcon
                class={style.infoIcon}
                onclick={(e) => {
                    e.stopPropagation();
                    oninfoclick();
                }}
                onkeydown={(e) => e.stopPropagation()}
                title={infoTitle}/>
    {:else if infoText}
        <span class={style.infoText}>
            {infoText}
        </span>
    {/if}

    {@render children?.()}

    {#if count}
        <CountBadge count={count} class={style.countBadge} title={countTitle}/>
    {/if}
</div>
