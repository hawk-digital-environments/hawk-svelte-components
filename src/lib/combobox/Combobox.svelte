<script lang="ts">
    import Chip from '../chip/Chip.svelte';
    import {Combobox} from 'melt/builders';
    import type {ComponentProps, Snippet} from 'svelte';
    import ChipList from '../chip/ChipList.svelte';
    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import type {HTMLAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.js';
    import type {SelectOption} from '../select/Select.svelte';
    import Icon from '../icon/Icon.svelte';
    import type {IconName} from '../icon/iconDefinition.js';
    import {watch} from 'runed';
    import style from './Combobox.module.sass';
    import SnippetOrString from '../util/snippetOrString/SnippetOrString.svelte';
    import {SvelteSet} from 'svelte/reactivity';
    import FormLabelFloatContainer from '../util/formLabelFloatContainer/FormLabelFloatContainer.svelte';

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
         * An optional label to display when searched for values that don't exist in the options.
         * Can be either a string or a snippet.
         * If this is not set, the default label will be "Nichts gefunden"
         </br>
         '
         */
        nothingFoundLabel?: string | Snippet;

        /**
         * The currently selected values.
         * If this is set, the component will be in a controlled state.
         * In this case, the component will manage its own state.
         * If you want to control the state yourself, you can use the `bind:value` directive.
         */
        value?: string[];

        /**
         * An optional filter to execute whenever the user types in the input field.
         * This can be used to filter the next selectable options based on the current selection.
         * This filter is only used for the dropdown, existing / selected chips will not be removed
         * because this would counteract the intended behavior.
         * The filter receives the list of options and the list of currently selected values.
         * The third parameter "onCancel" accepts a callback to execute when the filter has been canceled
         * and should be replaced with a new one; this is useful for async operations.
         */
        filter?: (options: SelectOption[], values: Array<string>, onCancel: (cb: () => void) => void) => Promise<SelectOption[]> | SelectOption[];

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
        iconLeft?: IconName;

        /**
         * An optional icon to display to the right of the input
         */
        iconRight?: IconName;
    }

    let {
        options = [],
        label: labelValue,
        nothingFoundLabel = 'Nichts gefunden',
        value: externalValue = $bindable([]),
        placeholder,
        filter,
        id,
        iconLeft,
        iconRight,
        required,
        disabled,
        error,
        block,
        description,
        ...restProps
    }: Props = $props();

    const valueSeparator = '[*||*]';
    const getInternalValue = (value: string, option?: SelectOption) => {
        const optionOfValue = option ?? options.find(o => o.value === value);
        if (!optionOfValue?.value) {
            return undefined;
        }

        return optionOfValue.label + valueSeparator + optionOfValue.value;
    };
    const getExternalValue = (value: string) => {
        const parts = value.split(valueSeparator);
        parts.shift();
        return parts.join(valueSeparator);
    };
    let values: Array<string> = $state([]);
    const removeValue = (value: string) => {
        combobox.value = values.filter(v => v !== value) as any;
    };

    const combobox = new Combobox<string>({
        multiple: true,
        onValueChange: (value) => {
            values = Array.from(value as any);
            externalValue = values.map(getExternalValue);
        },
        floatingConfig: {
            offset: {
                mainAxis: 0
            }
        }
    });

    // Incoming value changes
    watch([() => externalValue], () => {
        combobox.value = new SvelteSet(externalValue?.map(v => getInternalValue(v)) as any ?? []) as any;
    });

    let filterCancelCallbacks: Array<() => void> = $state([]);
    let preFilteredOptions: Array<SelectOption> = $state([]);
    let awaitingFilter = $state(false);
    watch([() => filter, () => values, () => options], ([filter, values, options]) => {
        if (filterCancelCallbacks.length > 0) {
            filterCancelCallbacks.forEach(cb => cb());
            filterCancelCallbacks = [];
        }

        if (!filter) {
            awaitingFilter = false;
            preFilteredOptions = options;
            return;
        }

        awaitingFilter = true;
        const filterPromise = filter(
            options,
            Array.from(values).map(getExternalValue),
            (cb) => {
                filterCancelCallbacks.push(cb);
            });

        if (filterPromise instanceof Promise) {
            filterPromise.then(options => {
                awaitingFilter = false;
                preFilteredOptions = options;
            });
        } else if (Array.isArray(filterPromise)) {
            awaitingFilter = false;
            preFilteredOptions = filterPromise;
        } else {
            console.error('Filter function must return a promise or an array of options', filterPromise, 'was returned instead');
            preFilteredOptions = options;
        }
    });

    const optionsWithInternalValue: Array<SelectOption & { valueInternal: string }> = $derived.by(() => {
        return preFilteredOptions.map((option) => {
            return {
                ...option,
                valueInternal: getInternalValue(option.value, option)!
            };
        });
    });
    const filteredOptions = $derived.by(() => {
        if (!combobox.touched) {
            return optionsWithInternalValue;
        }
        return optionsWithInternalValue.filter((o) =>
            o.label.toLowerCase().includes(combobox.inputValue.trim().toLowerCase())
        );
    });

    const chips = $derived.by(() => {
        const result: Array<ComponentProps<typeof Chip>> = [];
        for (const option of options) {
            const internalValue = getInternalValue(option.value, option)!;
            if (values.includes(internalValue)) {
                result.push({
                    label: option.label,
                    onremoveclick: () => removeValue(internalValue)
                });
            }
        }
        return result;
    });

    let inputEl = $state<HTMLInputElement | null>(null);
    let focusTimeout: any = $state(0);
    let focused = $state(false);
    const float = $derived(focused || chips.length > 0 || !!inputEl?.value || !!placeholder);

    const {popovertarget, containerId, inputProps} = $derived.by(() => {
        const {popovertarget, id: containerId, ...inputProps} = combobox.input;
        return {popovertarget, containerId, inputProps};
    });
    const inputId = $derived(id || combobox.ids.trigger + '-input');
</script>
<FormLabelFloatContainer
        {...restProps}
        float={float}
        layoutWrapProps={{
            id: containerId,
            popovertarget
        }}
        iconLeft={iconLeft}
        iconRight={iconRight}
        dropdownOpen={combobox.open}
        dropdownProps={combobox.content}
        {disabled}
        {error}
        {description}
        {block}
>
    {#snippet label(floatingClass)}
        <FormLabel for={inputId} children={labelValue} class={floatingClass} {required}/>
    {/snippet}

    {#snippet input(floatingClass)}
        <ChipList chips={chips} {disabled}/>
        <input
                type="text"
                bind:this={inputEl}
                {...mergeProps(
                    inputProps,
                    {
                        id: inputId,
                        placeholder,
                        disabled,
                        class: [
                            floatingClass,
                            style.input,
                            chips.length > 0 && style.hasChips
                        ],
                        onblur: () => {
                            clearTimeout(focusTimeout)
                            focusTimeout = setTimeout(() => focused = false, 200);
                        },
                        onfocus: () => {
                            clearTimeout(focusTimeout)
                            focused = true;
                            focusTimeout = setTimeout(() => combobox.open = true, 100);
                        }
                    }
                )}>
    {/snippet}

    {#snippet dropdown(dropdownStyle)}
        {#if awaitingFilter}
            <div class={dropdownStyle.item}>
                One sec...
            </div>
        {:else}
            {#each filteredOptions as option}
                <div {...(option.disabled ? {} : combobox.getOption(option.valueInternal))}
                     class={[
                     dropdownStyle.item,
                     combobox.isSelected(option.valueInternal) && dropdownStyle.itemSelected,
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
            {:else}
                <div class={dropdownStyle.item}>
                    <SnippetOrString value={nothingFoundLabel}/>
                </div>
            {/each}
        {/if}
    {/snippet}
</FormLabelFloatContainer>
