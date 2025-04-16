<script lang="ts">

    import FormLabel from '../util/formLabel/FormLabel.svelte';
    import FloatingFormContainer from '../util/floatingFormContainer/FloatingFormContainer.svelte';
    import type {HTMLAttributes, HTMLTextareaAttributes} from 'svelte/elements';
    import type {Snippet} from 'svelte';

    interface Props extends HTMLTextareaAttributes {
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
         * Additional props to apply to the wrapper div around the input and description/error.
         */
        containerProps?: HTMLAttributes<HTMLDivElement>;
    }

    let {
        required,
        disabled,
        label,
        id,
        error,
        description,
        onfocus,
        onblur,
        value,
        placeholder,
        class: className,
        ...restProps
    }: Props = $props();

    let focused = $state(false);
    const _onfocus = $derived((e: FocusEvent) => {
        focused = true;
        onfocus?.(e as any);
    });
    const _onblur = $derived((e: FocusEvent) => {
        focused = false;
        onblur?.(e as any);
    });
    let float = $derived.by(() => focused === true || !!value || !!placeholder);

    const uniqueId = $props.id();
    const inputId = id || uniqueId;
</script>
{#snippet labelSnippet(floatingClass)}
    <FormLabel for={inputId} required={required} class={floatingClass} children={label}/>
{/snippet}

{#snippet inputSnippet(floatingClass)}
    <textarea
            class={[ floatingClass, className ]}
            bind:value={value}
            id={inputId}
            placeholder={placeholder}
            {...restProps}
            disabled={disabled}
            required={required}
            onfocus={_onfocus}
            onblur={_onblur}
    ></textarea>
{/snippet}

<FloatingFormContainer
        float={float}
        label={labelSnippet}
        input={inputSnippet}
        description={description}
        error={error}
        disabled={!!disabled}
        block={true}
/>
