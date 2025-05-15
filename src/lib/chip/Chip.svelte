<script lang="ts">
    import type {Snippet} from 'svelte';
    import type {HTMLAttributes} from 'svelte/elements';
    import type {IconName} from '$lib/icon/iconDefinition.js';
    import Icon from '$lib/icon/Icon.svelte';
    import SnippetOrString from '$lib/util/snippetOrString/SnippetOrString.svelte';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import style from './Chip.module.sass';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * The visual label on the chip. Can be either a string or a snippet
         */
        label?: string | Snippet

        /**
         * Determines the visual type of the chip.
         */
        type?: 'outlined' | 'filled';

        /**
         * An optional name of an icon to display on the left of the icon
         */
        icon?: IconName,

        /**
         * An optional handler to execute when clicking on the chip
         */
        onclick?: () => void;

        /**
         * If provided, the chip will be added with an "add" icon on the right.
         * This handler will be executed when the icon is clicked. If "onremoveclick" is also provided,
         * the latter will be executed instead.
         */
        onaddclick?: () => void;

        /**
         * A human readable aria label for the "add" icon.
         * Only used if the "add" icon is displayed. Defaults zu "Hinzufügen"
         */
        addActionLabel?: string;

        /**
         * If provided, the chip will be added with an "remove" icon on the right.
         * This handler will be executed when the icon is clicked. If "onaddclick" is also provided,
         * the remove handler will take precedence.
         */
        onremoveclick?: () => void;

        /**
         * A human readable aria label for the "remove" icon.
         * Only used if the "remove" icon is displayed. Defaults zu "Entfernen"
         */
        removeActionLabel?: string;

        /**
         * If set to true, the chip will be disabled
         */
        disabled?: boolean;
    }

    const {
        label,
        type = 'outlined',
        icon,
        onclick,
        onaddclick,
        onremoveclick,
        addActionLabel = 'Hinzufügen',
        removeActionLabel = 'Entfernen',
        disabled,
        ...restProps
    }: Props = $props();

    const isTabbable = $derived(!!onaddclick || !!onremoveclick || !!onclick);
    const isRemovable = $derived(!!onremoveclick);
    const actionLabel = $derived(isRemovable ? removeActionLabel : addActionLabel);
</script>

{#snippet triggerContent()}
    {#if !!icon}
        <Icon icon={icon} size="small"/>
    {/if}
    <span class={style.label}>
        <SnippetOrString value={label}/>
    </span>
{/snippet}

<div {...mergeProps(
    restProps,
    {
        class: [
            style.chip,
            type === 'outlined' && style.typeOutlined,
            type === 'filled' && style.typeFilled,
            !!disabled && style.disabled
        ]
    }
)}>
    {#if isTabbable}
        <button type="button" class={style.trigger} {disabled}>
            {@render triggerContent()}
        </button>
    {:else}
        <div class={style.trigger}>
            {@render triggerContent()}
        </div>
    {/if}
    {#if !!onaddclick || !!onremoveclick}
        <button type="button" onclick={isRemovable ? onremoveclick : onaddclick}
                class={[style.actionButton, style.trigger]}
                {disabled}
                aria-label={actionLabel}>
            <Icon icon="plus" size="small" class={[style.actionIcon, isRemovable && style.removable]}
                  title={actionLabel}/>
        </button>
    {/if}
</div>
