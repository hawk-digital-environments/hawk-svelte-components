<script lang="ts">
    import type {Snippet} from 'svelte';
    import style from './FormMessages.module.sass';
    import type {HTMLAttributes} from 'svelte/elements';
    import {fly} from 'svelte/transition';
    import {Icon, SnippetOrString} from '$lib';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * An optional description text, or a snippet containing additional markup
         * If description and error are empty, the component will not be rendered
         */
        description?: string | Snippet;

        /**
         * An optional error text, or a snippet containing additional markup
         * If description and error are empty, the component will not be rendered
         */
        error?: string | Snippet;

        /**
         * If set to true, the messages will be rendered as disabled
         */
        disabled?: boolean;
    }

    const {
        description,
        error,
        class: _class,
        disabled,
        ...restProps
    }: Props = $props();

</script>

{#if error || description}
    <div class={[style.formMessages, _class || '', disabled && style.disabled]} {...restProps}
         transition:fly={{duration: 200}}>
        {#if description}
            <p class={style.description}>
                <SnippetOrString value={description}/>
            </p>
        {/if}
        {#if error}
            <span class={style.error}>
                <Icon icon="info" size="small"/>
                <SnippetOrString value={error}/>
            </span>
        {/if}
    </div>
{/if}
