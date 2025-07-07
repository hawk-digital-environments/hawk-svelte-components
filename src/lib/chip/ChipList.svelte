<script lang="ts">
    import type {ComponentProps} from 'svelte';
    import type {HTMLAttributes} from 'svelte/elements';
    import {fly} from 'svelte/transition';
    import Chip from '$lib/chip/Chip.svelte';
    import {FocusList} from '$lib/util/focusList/FocusList.js';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import style from './ChipList.module.sass';

    type ChipProps = ComponentProps<typeof Chip>;

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * A list of chip definitions to show in the list
         */
        chips: ChipProps[];

        /**
         * The visual type of the chips in the list.
         * If not set, the default type of the Chip component will be used.
         */
        type?: ChipProps['type'];

        size?: ChipProps['size'];

        /**
         * If true, the list will be disabled and all chips will be disabled as well.
         * @default false
         */
        disabled?: boolean;
    }

    const {
        chips = [],
        disabled = false,
        type,
        size,
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
                <Chip {type} {size} {...chip} disabled={disabled || chip?.disabled || false}/>
            </div>
        {/each}
    </div>
{/if}
