<script lang="ts">
    import type {HTMLLabelAttributes} from 'svelte/elements';
    import style from './FormLabel.module.sass';
    import type {Snippet} from 'svelte';
    import {SnippetOrString} from '$lib';

    /**
     * This interface is here, so typescript does not cry when we extend the "children"
     * property so it allows both snippets as well as strings.
     */
    interface NonCollidingAttributes extends HTMLLabelAttributes {
        children?: any;
    }

    /**
     * Renders a generic form label.
     */
    interface Props extends NonCollidingAttributes {
        /**
         * The label text. If not provided, the label will not be rendered.
         */
        children?: string | Snippet | undefined;

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
        class: classNames,
        ...restProps
    }: Props = $props();
</script>

{#if children}
    <label class={[style.label, classNames, disabled && style.disabled]} {...restProps}>
        {#if required}
            <SnippetOrString value={children}/>&nbsp;<span aria-hidden="true" class={style.required}>*</span>
        {:else}
            <SnippetOrString value={children}/>
        {/if}
    </label>
{/if}
