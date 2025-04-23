<script lang="ts">
    import type {Snippet} from 'svelte';
    import {type TabContentData, tabContext} from './TabContext.js';
    import {SvelteMap} from 'svelte/reactivity';
    import {Tabs} from 'melt/builders';

    interface Props {
        /**
         * The content of the tab wrapper.
         * This should contain the `TabTriggers` component as well at least one `TabContent` component.
         */
        children: Snippet;

        /**
         * Can be used to set the selected tab. The value is the key of the tab to select
         * (if no key was defined, the label will be used).
         * This is a bindable property.
         */
        selected?: string;
    }

    let {
        children,
        selected = $bindable('')
    }: Props = $props();

    const contents = $state(new SvelteMap<string, TabContentData>());
    const ctx = tabContext.set({
        contents,
        tabs: new Tabs({
            value: () => selected,
            onValueChange: (newKey) => {
                selected = newKey;
            }
        }),
        setSelected(key) {
            if (!this.isDisabled(key) && key !== selected) {
                selected = key;
            }
        },
        getSelected: () => selected,
        isDisabled: (key) => contents.get(key)?.disabled === true,
        isSelected: (key) => key === selected
    });

    // Ensure to switch to an enabled tab if the current one got disabled
    $effect(() => {
        if (ctx.isDisabled(ctx.getSelected()) || !contents.has(ctx.getSelected())) {
            const firstEnabled = [...contents.keys()].find(key => !ctx.isDisabled(key));
            if (firstEnabled) {
                selected = firstEnabled;
            }
        }
    });
</script>

{@render children?.()}
