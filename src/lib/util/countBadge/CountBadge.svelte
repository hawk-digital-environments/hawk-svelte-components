<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import style from 'CountBadge.module.sass';

    interface Props extends HTMLAttributes<HTMLSpanElement> {
        /**
         * The count to display in the badge.
         */
        count: number;
    }

    const {
        count = 0,
        ...restProps
    }: Props = $props();

    const countFormatted = $derived.by(() => {
        const absCount = Math.abs(count);
        return absCount >= 1000 ? absCount.toLocaleString() : absCount.toString();
    });
</script>

<span {...mergeProps(
    {
        class: [style.badge]
    },
    restProps
)}>{countFormatted}</span>
