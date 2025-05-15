<script lang="ts">
    import type {HTMLAttributes, MouseEventHandler} from 'svelte/elements';
    import style from './Avatar.module.sass';
    import {Avatar} from 'melt/builders';
    import type {IconName} from '$lib/icon/iconDefinition.js';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import AvatarCircle from '$lib/avatar/AvatarCircle.svelte';
    import Icon from '$lib/icon/Icon.svelte';

    interface NonCollidingProps extends HTMLAttributes<HTMLDivElement> {
        onclick?: any;
    }

    interface Props extends NonCollidingProps {
        /**
         * Defines the image src of the avatar. This is either an absolute, or relative url.
         */
        src?: string;

        /**
         * Defines the name of the user represented by the avatar.
         */
        name?: string;

        /**
         * Defines whether the name should be shown.
         * Note, even if enabling this, there is not a lot of space for the name, so long names will be truncated.
         */
        showName?: boolean;

        /**
         * Defines the size of the avatar.
         * @default large
         */
        size?: 'large' | 'small';

        /**
         * Allows you to add a special state marker to the avatar.
         * Currently implemented are "online" and "offline". If omitted, no state will be shown.
         */
        status?: 'online' | 'offline';

        /**
         * Used for aria labels and title when the "state" property has been set to "online".
         */
        onlineLabel?: string;

        /**
         * Used for aria labels and title when the "state" property has been set to "offline".
         */
        offlineLabel?: string;

        /**
         * Allows you to add an "action" icon to the avatar.
         * This can be used to add or remove users from a list for example.
         */
        actionIcon?: IconName;

        /**
         * An optional label for the action icon.
         * This is used for accessibility. You SHOULD set this when the "actionIcon" property is set.
         */
        actionIconLabel?: string;

        /**
         * This defines the action to execute when the "actionIcon" property was set.
         * The action will be executed when the user clicks on the action icon.
         * This is useful for adding or removing users from a list for example.
         */
        onactionclick?: MouseEventHandler<HTMLAnchorElement>;

        /**
         * If this handler is given, the avatar itself becomes selectable.
         * This means that the user can click on the avatar to execute the given handler.
         * This is useful for opening modals and alike.
         */
        onclick?: () => void;
    }

    const {
        src,
        name,
        showName = false,
        size = 'large',
        status,
        onlineLabel = 'Online',
        offlineLabel = 'Offline',
        actionIcon,
        actionIconLabel,
        onactionclick,
        onclick,
        ...restProps
    }: Props = $props();

    const avatar = new Avatar({
        src: () => src,
        delayMs: 50
    });

    const stateLabel = $derived.by(() => {
        if (!!status) {
            return status === 'online' ? onlineLabel : offlineLabel;
        }
        return undefined;
    });
    const title = $derived.by(() => {
        if (!name) {
            return undefined;
        }
        return [name, stateLabel].filter(Boolean).join(' - ');
    });
</script>

<div {...mergeProps(
    restProps,
    {
        class: [
            style.avatar,
            size === 'large' ? style.large : style.small,
        ],
        title
    }
)}>
    <AvatarCircle {size} {onclick}>
        {#snippet children(cropClass)}
            <svg {...mergeProps(
                avatar.fallback,
                {class: cropClass}
            )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
                <path fill="#b0b5be" d="M0 0h2000v2000H0z"/>
                <g fill="#d9d9d9">
                    <path d="M1421.3 862a416.7 416.7 0 1 1-833.4 0 416.7 416.7 0 0 1 833.4 0zM274.5 1557.8c17.6-18 31.5-32.8 52.5-49.8 106-84 125-86 678-89 397-1 480 1 533 14 79 19 174.7 92 194.9 122.9 16.2 24.8 190.2 304 210.3 443.5H68.5c9.2-127.1 191-426.2 206-441.6Z"/>
                </g>
            </svg>
            <img {...mergeProps(
                avatar.image,
                {
                    class: [cropClass, style.image, avatar.loadingStatus === "loaded" ? style.loaded : undefined],
                }
            )} alt={name ?? 'Avatar'}/>
        {/snippet}
        {#snippet aboveOverlay()}
            {#if !!status && !actionIcon}
            <span aria-label={stateLabel} class={[
                style.state,
                status === 'online' ? style.online : style.offline
            ]} title={stateLabel}></span>
            {/if}
            {#if !!actionIcon}
                <a href="#noop" class={style.action} onclick={(e) => {
                e.preventDefault();
                onactionclick?.(e);
            }} title={actionIconLabel} aria-label={actionIconLabel}>
                    <Icon icon={actionIcon} size="small" title={actionIconLabel}/>
                </a>
            {/if}
        {/snippet}
    </AvatarCircle>
    {#if showName && !!name}
        <span class={style.name}>{name}</span>
    {/if}
</div>
