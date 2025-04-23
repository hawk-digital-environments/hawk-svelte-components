<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import {mergeProps} from '../util/mergeProps.js';
    import style from './Typo.module.sass';

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
