<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';
    import style from './TabTriggers.module.sass';
    import {useResizeObserver} from 'runed';
    import {tabContext} from '$lib/tabs/TabContext.js';
    import {mergeProps} from '$lib/util/mergeProps.js';
    import Icon from '$lib/icon/Icon.svelte';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * If true, the tab triggers will be displayed as a block element, allowing them to take up the full width of their container.
         */
        block?: boolean;
    }

    const {block, ...restProps}: Props = $props();

    if (!tabContext.exists()) {
        throw new Error('The "TabTriggers" component must be used inside a "Tabs" component');
    }

    const ctx = tabContext.get();
    const tabs = ctx.tabs;

    // Indicator position and size
    const indicatorStyle = $state({
        bottom: '0px',
        left: '0px',
        width: '0px',
        display: 'none'
    });

    let listEl = $state<HTMLDivElement | null>(null);

    // Ensure that we track the resize of the list element so we can recalculate the indicator position
    let resized = $state<number>(0);
    useResizeObserver(() => listEl, () => resized++);

    // Update indicator position and size when active tab changes
    $effect(() => {
        // This is only here, so the effect runs after the list element is resized
        resized;
        const activeKey = tabs.value;
        const activeButton = listEl?.querySelector(`button[data-melt-tabs-trigger="${activeKey}"]`);

        if (activeButton) {
            const buttonRect = activeButton.getBoundingClientRect();
            const parentRect = activeButton.parentElement?.getBoundingClientRect();

            if (parentRect) {
                indicatorStyle.bottom = `${buttonRect.bottom - parentRect.top}px`;
                $inspect('BOTTOM', indicatorStyle.bottom, buttonRect.bottom, parentRect.top);
                indicatorStyle.left = `${buttonRect.left - parentRect.left}px`;
                indicatorStyle.width = `${buttonRect.width}px`;
                indicatorStyle.display = 'block';
            }
        } else {
            indicatorStyle.display = 'none';
        }
    });

    const extractIcon = (key: string) => ctx.contents.get(key)!.icon!;
</script>

<div {...mergeProps(tabs.triggerList, restProps, {class: [style.list, block && style.block]})} bind:this={listEl}>
    {#each Array.from(ctx.contents.keys()) as key}
        <button
                {...(ctx.isDisabled(key) ? {} : tabs.getTrigger(key))}
                class={style.trigger}
                disabled={ctx.isDisabled(key)}
        >
            {#if ctx.contents.get(key)?.icon}
                <Icon icon={extractIcon(key)} size="small"
                      gradient={ctx.isSelected(key) ? 'default' : undefined}/>
            {/if}
            {(ctx.contents.get(key) ?? {}).label}
        </button>
    {/each}
    <div class={style.indicator}
         style:top={indicatorStyle.bottom}
         style:left={indicatorStyle.left}
         style:width={indicatorStyle.width}
         style:display={indicatorStyle.display}
    ></div>
</div>
