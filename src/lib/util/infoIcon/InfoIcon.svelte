<script lang="ts">
    import style from './InfoIcon.module.sass';
    import {Icon} from '$lib';
    import type {HTMLButtonAttributes, MouseEventHandler} from 'svelte/elements';
    import {mergeProps} from '$lib/util/mergeProps.js';

    interface Props extends HTMLButtonAttributes {
        /**
         * The function to call when the icon is clicked.
         */
        onclick: MouseEventHandler<HTMLButtonElement>;

        /**
         * The title to show when hovering the icon.
         */
        title?: string;
    }

    const {
        onclick,
        title = 'Info',
        ...restProps
    }: Props = $props();
</script>

<button {...mergeProps({
    class: style.button,
    type: 'button',
    onclick
}, restProps)}
>
    <Icon class={style.icon} icon="info" title={title}/>
</button>
