<script lang="ts">
    import {type Snippet} from 'svelte';
    import type {IconName} from '../icon/iconDefinition.ts';
    import type {MouseEventHandler} from 'svelte/elements';
    import Link from '../util/link/Link.svelte';
    import Icon from '../icon/Icon.svelte';
    import style from './Button.module.sass';

    interface Props {
        /**
         * Determines the size of the button
         */
        size?: "small" | "large";

        /**
         * Determines the visual type of the button. There is a "hidden" >link< type that is
         * automatically applied when a "link" value is provided
         */
        type?: "filled" | "outlined" | "text" | "raised";

        /**
         * The label of the button can be passed as children
         */
        children?: Snippet;

        /**
         * The name of an optional icon to display
         */
        icon?: IconName;

        /**
         * Determines the position of the icon
         */
        iconPosition?: "left" | "right" | "above" | "iconOnly";

        /**
         * An optional link to navigate to, if set the button will render as an anchor tag,
         * also the "type" will be set to "link"
         */
        link?: string;

        /**
         * The target of the link, defaults to "_self". Omitted when the button is not a link
         */
        linkTarget?: string;

        /**
         * Disables the button if set to true, both visually and functionally.
         * When disabled, neither the link, nor the onclick event will be triggered.
         */
        disabled?: boolean;

        /**
         * The onclick event handler. Will also be triggered when the button is a link.
         * If the button is a link the e.preventDefault() method can be used to prevent the default behavior.
         */
        onclick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    }

    const {
        size = 'small',
        type: typeRaw = 'filled',
        link,
        linkTarget,
        icon,
        iconPosition = 'left',
        children,
        disabled = false,
        onclick
    }: Props = $props();

    const type = $derived(link ? 'link' : typeRaw);
    const buttonClasses = $derived({
        [style.button]: true,
        [style.iconPositionLeft]: iconPosition === 'left',
        [style.iconPositionRight]: iconPosition === 'right',
        [style.iconPositionAbove]: iconPosition === 'above',
        [style.iconPositionIconOnly]: iconPosition === 'iconOnly',
        [style.sizeLarge]: size === 'large',
        [style.typeFilled]: type === 'filled',
        [style.typeOutlined]: type === 'outlined',
        [style.typeText]: type === 'text',
        [style.typeLink]: type === 'link',
        [style.typeRaised]: type === 'raised',
        [style.disabled]: disabled
    });
</script>

{#snippet content()}
    {#if icon}
        <Icon icon={icon} size="small" class={style.icon}/>
    {/if}
    <span class="label">{@render children?.()}</span>
{/snippet}

{#if link}
    <Link href={link} target={linkTarget} class={buttonClasses} disabled={disabled} onclick={onclick}>
        {@render content()}
    </Link>
{:else}
    <button type="button" class={buttonClasses} disabled={disabled} onclick={onclick}>
        {@render content()}
    </button>
{/if}
