<script lang="ts" module>
    import type {IconName} from '../icon/iconDefinition.ts';

    export interface SelectOption {
        value: string;
        label: string;
        disabled?: boolean;
        iconLeft?: IconName;
        iconRight?: IconName;
    }

</script>
<script lang="ts">
    import {Select} from 'melt/builders';
    import FloatingFormContainer from '../util/floatingFormContainer/FloatingFormContainer.svelte';
    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import style from './Select.module.sass';
    import type {Snippet} from 'svelte';
    import {watch} from 'runed';
    import Icon from '../icon/Icon.svelte';
    import type {HTMLAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.ts';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * The list of options that can be selected
         */
        options: SelectOption[];

        /**
         * The visual label above the input field. If there is neither a cursor in the field, nor a placeholder,
         * the label will float above the input
         */
        label: string | Snippet;

        /**
         * An optional placeholder to display when the input is empty
         */
        placeholder?: string;

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
         * The value of the input. Can be bound to a variable from the parent component.
         */
        value?: string | undefined;

        /**
         * If set to true, the input will be rendered in a required state
         */
        required?: boolean;

        /**
         * If set to true, the input will be rendered in a disabled state
         */
        disabled?: boolean;

        /**
         * By default, the input field will match the width of the label/input.
         * If this is set to true, it will take up the full width of the container
         */
        block?: boolean;

        /**
         * An optional icon to display to the left of the input
         */
        icon?: IconName;

        /**
         * Optional props to pass to the trigger button
         */
        buttonProps?: HTMLAttributes<HTMLButtonElement>;
    }

    let {
        options = [],
        value = $bindable(),
        label: labelValue,
        id,
        block,
        description,
        error,
        required,
        disabled,
        icon,
        buttonProps,
        placeholder,
        ...restProps
    }: Props = $props();

    const select = new Select<string>({
        value: value,
        onValueChange(newValue) {
            value = newValue;
        },
        onHighlightChange(newValue) {
            // Ignore if we had no keydown -> means we clicked on the element instead of using the keyboard
            if (!hadKeydown) {
                return;
            }
            container.getDropdownElement()
                ?.querySelector(`[data-value="${newValue}"]`)
                ?.scrollIntoView({
                    block: 'nearest'
                });
        },
        floatingConfig: {
            offset: {
                mainAxis: 0
            }
        }
    });

    watch([() => value], ([value]) => {
        select.value = value;
    });

    let hadKeydown = $state(false);
    let hadKeydownTimeout: any = $state(0);
    const float = $derived(!!select.value || !!placeholder);
    const valueLabel = $derived.by(() => {
        for (const option of options) {
            if (option.value === select.value) {
                return option.label;
            }
        }
        return select.value;
    });
    const {popovertarget, containerId, triggerProps} = $derived.by(() => {
        const {popovertarget, id: containerId, ...triggerProps} = select.trigger;
        return {popovertarget, containerId, triggerProps};
    });
    const inputId = $derived(id || select.ids.trigger + '-input');
    let inputEl: HTMLButtonElement;
    let container: ReturnType<typeof FloatingFormContainer>;
</script>

<FloatingFormContainer
        bind:this={container}
        {...mergeProps(
            restProps,
            {
                class: style.container,
                onclick: (e: MouseEvent) => {
                    if (e.target instanceof HTMLButtonElement || disabled) {
                        return;
                    }
                    setTimeout(() => select.open = !select.open, 0);
                },
                onkeydowncapture: () => {
                    clearTimeout(hadKeydownTimeout);
                    hadKeydown = true;
                    hadKeydownTimeout = setTimeout(() => {
                        hadKeydown = false;
                    }, 100);
                }
            }
        )}
        layoutWrapProps={{
            id: containerId,
            popovertarget,
            // The next two lines are a "hack", so the select box can automatically focus
            // the button again if the user hits escape or selects a value
            // We need this, because we provide the containerId to the
            tabindex: -1,
            onfocus: () => inputEl?.focus()
        }}
        dropdownOpen={select.open}
        dropdownProps={{
            ...select.content,
            onclick: e => e.stopPropagation(),
        }}
        visualFocus={select.open}
        float={float}
        iconLeft={icon}
        {description}
        {error}
        {disabled}
        {block}
        iconRight="chevronDown"
        iconRightProps={{class: [style.chevron, select.open && style.open]}}
>
    {#snippet label(floatingClass)}
        <FormLabel for={inputId} class={floatingClass} children={labelValue} {required}/>
    {/snippet}

    {#snippet input(floatingClass)}
        <button
                bind:this={inputEl}
                {...mergeProps(
                    buttonProps,
                    triggerProps,
                    {
                        id: inputId,
                        class: [floatingClass, style.button, !!placeholder && style.placeholder],
                        disabled
                    })}
        >
            {#if !!select.value}
                {valueLabel}&nbsp;
            {:else if !!placeholder}
                {placeholder}&nbsp;
            {:else}
                &nbsp;
            {/if}
        </button>
    {/snippet}

    {#snippet dropdown(dropdownStyle)}
        {#each options as option}
            <div {...(option.disabled ? {} : select.getOption(option.value, {typeahead: option.label}))}
                 class={[
                     dropdownStyle.item,
                     select.isSelected(option.value) && dropdownStyle.itemSelected,
                     option.disabled && dropdownStyle.itemDisabled
                     ]}>
                {#if option.iconLeft}
                    <Icon icon={option.iconLeft} size="small"/>
                {/if}
                <span class={dropdownStyle.itemLabel}>
                    {option.label}
                </span>
                {#if option.iconRight}
                    <Icon icon={option.iconRight} size="small"/>
                {/if}
            </div>
        {/each}
    {/snippet}
</FloatingFormContainer>
