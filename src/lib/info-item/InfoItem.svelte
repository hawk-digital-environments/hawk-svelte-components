<script lang="ts">
    import {type Snippet} from 'svelte';
    import style from './InfoItem.module.sass';
    import type {IconName} from '$lib/icon/iconDefinition.js';
    import Icon from '$lib/icon/Icon.svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import SnippetOrString from '$lib/util/snippetOrString/SnippetOrString.svelte';

    interface Props extends HTmlAttributes<HTMLDivElement> {
        /**
         * The label of the info-item
         */
        label?: string|Snippet;

        /**
         * The name of an optional icon to display
         */
        icon?: IconName;

        /**
         * The link to navigate to when the info-item is clicked
         */
        children: string|Snippet;
    }

    const {
        icon,
        label,
        children,
        ...restProps
    }: Props = $props();
</script>

<div {...mergeProps(
    restProps,
    {
        class: style.infoItem,
    }
)}>
    <span class={style.label}><SnippetOrString value={label}/></span>
    {#if icon}
        <Icon icon={icon} size="small" class={style.icon} />
    {/if}
    <span class="description"><SnippetOrString value={children}/></span>
</div>
