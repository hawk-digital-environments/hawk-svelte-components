<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './Typo.module.sass';
    import {mergeProps} from '$lib/util/mergeProps.js';

    interface Props extends HTMLAttributes<HTMLDivElement> {

    }

    const {
        children,
        ...restProps
    }: Props = $props();
</script>
<div {...mergeProps(restProps, {class: style.typo})}>
    {@render children?.()}
</div>
