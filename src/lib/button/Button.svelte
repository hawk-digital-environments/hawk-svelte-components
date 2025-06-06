<svelte:options customElement={{
    shadow: 'none',
    extend: makeCustomComponent
}}/>
<script lang="ts">
    import {type Snippet} from 'svelte';
    import type {MouseEventHandler} from 'svelte/elements';
    import style from './Button.module.sass';
    import type {IconName} from '$lib/icon/iconDefinition.js';
    import Icon from '$lib/icon/Icon.svelte';
    import Link from '$lib/util/link/Link.svelte';
    import {makeCustomComponent} from '$lib/util/makeCustomComponent.js';

    interface Props {
        /**
         * Determines the size of the button
         */
        size?: "small" | "large";

        /**
         * Determines the visual type of the button.
         */
        type?: 'filled' | 'outlined' | 'text' | 'raised' | 'link';

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

        /**
         * If set to true, the button will be rendered as a submit button.
         * This will only have an effect if the button is used inside a form (which will by default not trigger a submit event).
         * This is useful for buttons that are used to submit a form, such as "Save" or "Submit".
         * It does not work if the button is a link!
         */
        submit?: boolean;
    }

    const {
        size = 'small',
        type = 'filled',
        link,
        linkTarget,
        icon,
        iconPosition = 'left',
        children,
        disabled = false,
        submit = false,
        onclick
    }: Props = $props();

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

    const iconGradient: 'default' | undefined = $derived(
        icon &&
        ((iconPosition === 'above' || iconPosition === 'iconOnly') && type === 'link')
            ? 'default' : undefined
    );
</script>

{#snippet content()}
    {#if icon}
        <Icon icon={icon} size="small" class={style.icon} gradient={iconGradient}/>
    {/if}
    <span class={style.label}>{@render children?.()}</span>
{/snippet}

{#if link}
    <Link href={link} target={linkTarget} class={buttonClasses} disabled={disabled} onclick={onclick}>
        {@render content()}
    </Link>
{:else}
    <button type={!submit ? 'button' : undefined} class={buttonClasses} disabled={disabled} onclick={onclick}>
        {@render content()}
    </button>
{/if}
