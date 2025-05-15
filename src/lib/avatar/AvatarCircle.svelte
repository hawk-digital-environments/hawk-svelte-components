<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './AvatarCircle.module.sass';
    import type {Snippet} from 'svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';

    interface NonConflictingProps extends HTMLAttributes<HTMLDivElement> {
        children: any;
    }

    /**
     * Internal helper component to render the "circle" of an avatar.
     */
    interface Props extends NonConflictingProps {
        size?: 'large' | 'small';
        children: Snippet<[string]>;
        aboveOverlay?: Snippet<[string]>;
        onclick?: () => void;
    }

    const {
        size = 'large',
        children,
        aboveOverlay,
        onclick,
        ...restProps
    }: Props = $props();

    const clickableProps = $derived.by(() => {
        if (!onclick) {
            return undefined;
        }

        return {
            tabindex: 1,
            onclick: () => onclick(),
            onkeydown: (event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    onclick();
                }
            },
            class: [style.clickable]
        };
    });
</script>
<div {...mergeProps(
    restProps,
    clickableProps,
    {
        class: [style.circle, size === 'large' ? style.large : style.small]
    }
)}>
    {@render children?.(style.crop)}
    <span class={style.overlay}></span>
    {@render aboveOverlay?.(style.crop)}
</div>
