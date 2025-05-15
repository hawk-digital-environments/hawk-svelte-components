import {Context} from 'runed';
import type {SvelteMap} from 'svelte/reactivity';
import type {Tabs} from 'melt/builders';
import type {IconName} from '$lib';

export type TabContentData = {
    label: string,
    disabled?: boolean,
    icon?: IconName
}

export type TabContextType = {
    contents: SvelteMap<string, TabContentData>;
    tabs: Tabs,
    setSelected: (key: string) => void,
    getSelected: () => string,
    isDisabled: (key: string) => boolean,
    isSelected: (key: string) => boolean,
}

export const tabContext = new Context<TabContextType>('tabs');
