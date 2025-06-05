<svelte:options customElement={{
    shadow: 'none',
    extend: makeCustomComponent
}}/>
<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './Typo.module.sass';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import {makeCustomComponent} from '$lib/util/makeCustomComponent.js';

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
