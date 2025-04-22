<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import type {IconName} from '../../icon/iconDefinition.ts';
    import type {ComponentProps, Snippet} from 'svelte';
    import Icon from '../../icon/Icon.svelte';
    import style from './FloatingFormContainer.module.sass';
    import FormMessages from '../formMessages/FormMessages.svelte';
    import {mergeProps} from '../mergeProps.ts';
    import {scale} from 'svelte/transition';
    import {useResizeObserver} from 'runed';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * The label to render for the input. The snippet will receive a list of CSS classes
         * to apply to the <label> element.
         */
        label: Snippet<[string]>;

        /**
         * The input to render. The snippet will receive a list of CSS classes
         * to apply to the <input> element.
         */
        input: Snippet<[string]>;

        /**
         * If given, the container will allow the element to open a "dropdown" with the giving content.
         * Use the "dropdownOpen" prop to control the open state of the dropdown.
         */
        dropdown?: Snippet<[{ item: string, itemSelected: string, itemDisabled: string, itemLabel: string }]>;

        /**
         * If true, the dropdown will be open.
         * If false, the dropdown will be closed.
         * If the dropdown is not set, this will be ignored.
         */
        dropdownOpen?: boolean;

        /**
         * Additional props to apply to the dropdown container
         * Only used if the "dropdown" prop is set.
         */
        dropdownProps?: HTMLAttributes<HTMLDivElement> & Record<string, any>;

        /**
         * An optional snippet to render between the layout wrap and the messages
         */
        beforeMessages?: Snippet;

        /**
         * An optional icon to display to the left of the input
         */
        iconLeft?: IconName;

        /**
         * Additional props that can be passed to the icon on the left side.
         * If "iconLeft" is not set, this will be ignored
         */
        iconLeftProps?: Omit<ComponentProps<typeof Icon>, 'icon'>;

        /**
         * An optional icon to display to the right of the input
         */
        iconRight?: IconName;

        /**
         * Additional props that can be passed to the icon on the right side.
         * If "iconRight" is not set, this will be ignored
         */
        iconRightProps?: Omit<ComponentProps<typeof Icon>, 'icon'>;

        /**
         * By default, the input field will match the width of the label/input.
         * If this is set to true, it will take up the full width of the container
         */
        block?: boolean;

        /**
         * If true, the label will float above the input.
         * This should be true if there is a cursor in the field, a placeholder, or a value set
         */
        float?: boolean;

        /**
         * Allows the outside world to control the focus of the field.
         * This does NOT set the focus, but only applies the visual state
         */
        visualFocus?: boolean;

        /**
         * An optional description to display below the label. Can be either a string or a snippet
         */
        description?: string | Snippet;

        /**
         * An optional error message to display below the input. Can be either a string or a snippet
         * If the error is set, the input will be rendered in an error state
         */
        error?: string | Snippet;

        /**
         * True to render the container in a disabled state
         */
        disabled?: boolean;

        /**
         * This will be called when any layout component of the container has been clicked!
         * This does not include the input element or the label!
         * @param event
         */
        onclick?: any;

        /**
         * Additional props to apply to the layout wrapper div
         */
        layoutWrapProps?: HTMLAttributes<HTMLDivElement> & Record<string, any>;
    }

    const {
        label,
        input,
        beforeMessages,
        dropdown,
        dropdownProps,
        dropdownOpen = false,
        iconLeft,
        iconLeftProps,
        iconRight,
        iconRightProps,
        block,
        float,
        error,
        description,
        disabled,
        visualFocus,
        layoutWrapProps,
        ...restProps
    }: Props = $props();

    const iconLeftClass = $derived(iconLeftProps?.class);
    const iconRightClass = $derived(iconRightProps?.class);

    // Because the real "input" element is only a part of our layout container
    // this click handler will focus the element on click on the outer container
    const onContainerClick = function (e: MouseEvent) {
        if (e.currentTarget instanceof HTMLElement) {
            const input = e.currentTarget.querySelector('input,select,textarea');
            if (input instanceof HTMLElement) {
                input.focus();
            }
        }
    };

    let containerEl = $state<HTMLElement | null>(null);
    let layoutWrapEl = $state<HTMLElement | null>(null);
    let inputLabelWrapEl = $state<HTMLElement | null>(null);
    let dropdownEl = $state<HTMLElement | null>(null);

    export function getContainerElement(): HTMLDivElement {
        return containerEl;
    }

    export function getLayoutWrapElement(): HTMLDivElement {
        return layoutWrapEl;
    }

    export function getInputLabelWrapElement(): HTMLDivElement {
        return inputLabelWrapEl;
    }

    export function getDropdownElement(): HTMLDivElement | undefined {
        return dropdownEl;
    }

    let messageWidth = $state('');
    useResizeObserver(
        () => layoutWrapEl,
        (entries) => {
            const entry = entries[0];
            if (!entry) {
                return;
            }

            messageWidth = entry.contentRect.width + 'px';
        }
    );
</script>

<div bind:this={containerEl}
     {...mergeProps(
         restProps,
         {
             class: [
                 style.container,
                 block && style.block,
             ],
             onclick: onContainerClick,
         }
     )}>
    <div bind:this={layoutWrapEl}
         {...mergeProps(layoutWrapProps,
             {
                 class: [
                     style.layoutWrap,
                     !!iconLeft && style.hasIconLeft,
                     !!iconRight && style.hasIconRight,
                     !!visualFocus && style.visualFocus,
                     float && style.float,
                     error && style.error,
                     disabled && style.disabled,
                     !!dropdown && style.hasDropdown
                 ]
             })}
    >
        {#if !!iconLeft}
            <Icon icon={iconLeft} {...iconLeftProps} class={[iconLeftClass, style.iconLeft]}/>
        {/if}
        <div bind:this={inputLabelWrapEl} class={style.inputLabelWrap}
             onclickcapture={(e: MouseEvent) => e.preventDefault()}>
            {@render label?.(style.label)}
            {@render input?.(style.input)}
        </div>
        {#if !!iconRight}
            <Icon icon={iconRight} {...iconRightProps} class={[iconRightClass, style.iconRight]}/>
        {/if}
    </div>
    {#if !!dropdown && dropdownOpen}
        <div
                bind:this={dropdownEl}
                transition:scale={{duration: 100}}
                {...mergeProps(
                    {
                        class: [style.dropdown]
                    },
                    dropdownProps
                )}>
            {@render dropdown({
                item: style.dropdownItem,
                itemSelected: style.dropdownItemSelected,
                itemDisabled: style.dropdownItemDisabled,
                itemLabel: style.dropdownItemLabel,
            })}
        </div>
    {/if}
    {@render beforeMessages?.()}
    <FormMessages {description} {error} {disabled} style={`width: ${messageWidth}`}/>
</div>
