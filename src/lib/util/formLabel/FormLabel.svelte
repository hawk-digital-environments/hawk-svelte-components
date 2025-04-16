<script lang="ts">
    import type {Snippet} from 'svelte';
    import type {HTMLLabelAttributes} from 'svelte/elements';
    import style from './FormLabel.module.sass';
    import SnippetOrString from '../snippetOrString/SnippetOrString.svelte';

    // @ts-ignore
    interface Props extends HTMLLabelAttributes {
        /**
         * The label text. If not provided, the label will not be rendered.
         */
        children?: Snippet | string;

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
