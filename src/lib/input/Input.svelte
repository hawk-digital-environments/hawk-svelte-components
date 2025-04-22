<script lang="ts">
    import type {HTMLAttributes, HTMLInputAttributes} from 'svelte/elements';
    import type {Snippet} from 'svelte';
    import type {IconName} from '$lib/icon/iconDefinition.ts';
    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import {mergeProps} from '../util/mergeProps.ts';
    import FormLabelFloatContainer from '../util/formLabelFloatContainer/FormLabelFloatContainer.svelte';

    interface Props extends HTMLInputAttributes {
        /**
         * The visual label above the input field. If there is neither a cursor in the field, nor a placeholder,
         * the label will float above the input
         */
        label: string | Snippet;

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
         * An optional icon to display to the left of the input
         */
        iconLeft?: IconName;

        /**
         * An optional icon to display to the right of the input
         */
        iconRight?: IconName;

        /**
         * An optional placeholder to display when the input is empty
         */
        placeholder?: string;

        /**
         * The value of the input. Can be bound to a variable from the parent component.
         */
        value?: string;

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
         * Additional props to apply to the wrapper div around the input and description/error.
         */
        containerProps?: HTMLAttributes<HTMLDivElement>;
    }

    let {
        label: labelValue,
        description,
        error,
        iconLeft,
        iconRight,
        value = $bindable(''),
        disabled,
        required,
        id,
        placeholder,
        block,
        containerProps,
        ...restProps
    }: Props = $props();

    let focused = $state(false);
    let float = $derived.by(() => focused === true || !!value || !!placeholder);
    const uniqueId = $props.id();
    const inputId = id || uniqueId;
</script>

<FormLabelFloatContainer
        float={float}
        iconLeft={iconLeft}
        iconRight={iconRight}
        description={description}
        error={error}
        disabled={disabled}
        block={block}
        {...containerProps}>
    {#snippet label(floatingClass)}
        <FormLabel for={inputId} required={required} class={floatingClass} children={labelValue}/>
    {/snippet}

    {#snippet input(floatingClass)}
        <input {...mergeProps(
            restProps,
            {
                class: floatingClass,
                onblur: () => {
                    focused = false;
                },
                onfocus: () => {
                    focused = true;
                }
            }
        )}
               bind:value={value}
               id={inputId}
               placeholder={placeholder}
               disabled={disabled}
               required={required}
        >
    {/snippet}
</FormLabelFloatContainer>
