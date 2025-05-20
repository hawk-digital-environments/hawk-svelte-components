<script lang="ts">
    import {type Snippet} from 'svelte';
    import style from './InfoItem.module.sass';
    import type {IconName} from '$lib/icon/iconDefinition.js';
    import Icon from '$lib/icon/Icon.svelte';


    interface Props {
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
      
    }: Props = $props();




</script>


    <span class={style.label}>{label}</span>
    {#if icon}
        <Icon icon={icon} size="small" class={style.icon} />
    {/if}

    <span class="description">{children}</span>

