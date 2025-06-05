<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './Card.module.sass';
    import {mergeProps} from '$lib/util/mergeProps.js';

    interface Props extends HTMLAttributes<HTMLDivElement> {
    }

    let {
        children,
        ...restProps
    }: Props = $props();

</script>

<div {...mergeProps(
    {
        class: style.card,
    },
    restProps
)}>
    {@render children?.()}
</div>
