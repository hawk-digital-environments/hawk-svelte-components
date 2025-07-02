<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import style from "./Card.module.sass";
    import { mergeProps } from "$lib/util/mergeProps.js";
    import type { Snippet } from "svelte";

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
         * An optional area for additional details.
         * This can be a string or a function returning a string or Svelte component.
         */
        details?: Snippet | string;
    }

    let {
        children,
        link,
        linkTarget,
        onclick: givenOnClick,
        disabled = false,
        details,
        ...restProps
    }: Props = $props();

    const isClickable = $derived(
        !disabled && (typeof givenOnClick === "function" || !!link),
    );
    const triggerAction = $derived((e: MouseEvent | KeyboardEvent) => {
        if (isClickable) {
            givenOnClick?.(e as any);
            if (link) {
                window.open(link, linkTarget || "_self");
            }
        }
    });
    const onKeyDown = $derived((e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            triggerAction(e);
        }
    });
</script>

<div
    {...mergeProps(
        {
            class: [
                style.card,
                isClickable && style.link,
                disabled && style.disabled,
            ],
            onclick: triggerAction,
            onkeydown: onKeyDown,
            tabindex: isClickable ? "0" : undefined,
            "aria-disabled": disabled ? "true" : undefined,
        },
        restProps,
    )}
>
    <div class={style.children}>
        {@render children?.()}
    </div>

    {#if details}
        <div class={style.details_border}></div>
        <div class={style.details}>
            {#if typeof details === "function"}
                {@render details()}
            {:else}
                {details}
            {/if}
        </div>
    {/if}
</div>
