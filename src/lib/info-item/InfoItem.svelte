<script lang="ts">
    import {type Snippet} from 'svelte';
    import style from './InfoItem.module.sass';
    import type {IconName} from '$lib/icon/iconDefinition.js';
    import Icon from '$lib/icon/Icon.svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import SnippetOrString from '$lib/util/snippetOrString/SnippetOrString.svelte';
    import type {HTMLAttributes} from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * The label of the info-item
         * 
         */
        label?: string | Snippet;

        /**
         * The name of an optional icon to display
         */
        icon?: IconName;
    }

    const {icon, label, children, ...restProps}: Props = $props();
</script>

<div
    {...mergeProps(restProps, {
        class: style.infoItem,
    })}
>
    <span class={style.label}><SnippetOrString value={label} /></span>
    <div class={style.infoContainer}>
        {#if icon}
            <Icon {icon} size="small" class={style.icon} />
        {/if}
        {#if children}
            <span class={style.info}>{@render children?.()}</span>
        {/if}
    </div>
</div>
