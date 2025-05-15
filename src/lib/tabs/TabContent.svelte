<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import type {IconName} from '$lib/icon/iconDefinition.js';
    import {tabContext} from '$lib/tabs/TabContext.js';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import {onMount} from 'svelte';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * The visual label on the tab trigger. This should be human readable!
         */
        label: string;

        /**
         * An optional icon to display next to the label.
         */
        labelIcon?: IconName;

        /**
         * A unique key to identify the tab. If not provided, the label will be used.
         * It is HIGHLY recommended to provide a key, as the label is not necessarily unique.
         */
        key?: string;

        /**
         * If set to true, the tab will be disabled.
         * This will also disable the tab trigger.
         */
        disabled?: boolean;
    }

    const {
        label,
        labelIcon,
        key,
        children,
        disabled,
        ...restProps
    }: Props = $props();

    if (!tabContext.exists()) {
        throw new Error('The "TabContent" component must be used inside a "Tabs" component');
    }

    const ctx = tabContext.get();
    const realKey = $derived(key || label);
    const setTabData = () => {
        ctx.contents.set(realKey, {label, icon: labelIcon, disabled: !!disabled});
    };

    setTabData();

    // Ensure the values can be updated
    $effect(() => setTabData());

    // Ensure the first tab is selected
    onMount(() => {
        if (!ctx.tabs.value) {
            ctx.setSelected(realKey);
        }
    });
</script>

{#if !disabled}
    <div {...mergeProps(ctx.tabs.getContent(realKey), restProps)}>
        {@render children?.()}
    </div>
{/if}
