<script lang="ts">
    import type {Snippet} from 'svelte';
    import type {HTMLLabelAttributes} from 'svelte/elements';
    import style from './FormLabel.module.sass';

    interface Props extends HTMLLabelAttributes {
        /**
         * The label text. If not provided, the label will not be rendered.
         */
        children?: Snippet;

        /**
         * Whether the label is required.
         */
        required?: boolean;

        /**
         * If set to true, the label will be disabled.
         */
        disabled?: boolean;
    }

    const {
        children,
        required = false,
        disabled = false,
        className,
        class: classNames,
        ...restProps
    }: Props = $props();
</script>

{#if children}
    <label class={[style.label, classNames, className, disabled && style.disabled]} {...restProps}>
        {@render children()}
        {#if required}
            <span aria-hidden="true" class={style.required}>*</span>
        {/if}
    </label>
{/if}
