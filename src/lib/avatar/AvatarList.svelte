<script lang="ts">
    import type {ComponentProps} from 'svelte';
    import Avatar from './Avatar.svelte';
    import {mergeProps} from '../util/mergeProps.js';
    import type {HTMLAttributes} from 'svelte/elements';
    import AvatarCircle from './AvatarCircle.svelte';
    import style from './AvatarList.module.sass';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * A list of avatars that should be displayed.
         * Each avatar should be defined using the `Avatar` component props.
         */
        avatars: Array<ComponentProps<typeof Avatar>>;

        /**
         * Sets the size of the avatars in the list.
         * If not given, theoretically each avatar can choose its own size, but that is discouraged.
         */
        size?: 'large' | 'small';

        /**
         * If you want to indicate that there are event more avatars, set this to the number you want to display.
         * You should define a `moreLabel` to describe what the number means.
         */
        more?: number;

        /**
         * The label that should be displayed when the `more` prop is set.
         * This is the "title" which appears when the user hovers over the "more" avatar.
         */
        moreLabel?: string;

        /**
         * An optional callback that is called when the "more" avatar is clicked.
         * This is useful if you want to open a modal or something similar.
         */
        onmoreclick?: () => void;
    }

    const {
        avatars = [],
        size,
        more,
        moreLabel,
        onmoreclick,
        ...restProps
    }: Props = $props();
</script>
<div {...mergeProps(
    restProps,
    {
        class: [
            style.list,
            size !== 'small' ? style.large : style.small,
        ]
    }
)}>
    {#each avatars as avatar}
        <Avatar {...mergeProps(
            avatar,
            {size}
        )}/>
    {/each}
    {#if !!more}
        <AvatarCircle {size} onclick={onmoreclick}>
            {#snippet children(crop)}
                <span class={[style.more, crop]} title={moreLabel}>+{more}</span>
            {/snippet}
        </AvatarCircle>
    {/if}
</div>
