<script lang="ts">
    import type {ComponentProps} from 'svelte';
    import type {HTMLAttributes} from 'svelte/elements';
    import {fly} from 'svelte/transition';
    import Chip from '$lib/chip/Chip.svelte';
    import {FocusList} from '$lib/util/focusList/FocusList.svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import style from './ChipList.module.sass';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * A list of chip definitions to show in the list
         */
        chips: Array<ComponentProps<typeof Chip>>;

        /**
         * If true, the list will be disabled and all chips will be disabled as well.
         * @default false
         */
        disabled?: boolean;
    }

    const {
        chips = [],
        disabled = false,
        ...restProps
    }: Props = $props();

    const focusList = new FocusList();
</script>

{#if chips.length > 0}
    <div {...mergeProps(
        restProps,
        focusList.list,
        {
            class: style.list
        }
    )} in:fly>
        {#each chips as chip}
            <div in:fly>
                <Chip {...chip} {disabled}/>
            </div>
        {/each}
    </div>
{/if}
