<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Tabs from './Tabs.svelte';
    import TabTriggers from './TabTriggers.svelte';
    import TabContent from './TabContent.svelte';
    import Button from '../button/Button.svelte';

    const {Story} = defineMeta({
        title: 'Handson/Tabs',
        component: Tabs,
        subcomponents: {
            TabTriggers,
            TabContent
        },
        tags: ['autodocs'],
        argTypes: {
            selected: {
                options: ['Tab1', 'Tab2', 'Tab3'],
                control: {type: 'radio'}
            }
        },
        args: {
            children: genericChildren
        }
    });

    let disabled = $state(false);
    const generateRandomContent = () => {
        const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'labore', 'magna', 'aliqua'];
        const length = Math.floor(Math.random() * 13) + 3; // Random length between 3-15
        return Array.from({length}, () => words[Math.floor(Math.random() * words.length)]).join(' ');
    };
</script>
<script>
    import Typo from '../typo/Typo.svelte';
</script>

{#snippet tabContent()}
    <Typo>
        {generateRandomContent()}
    </Typo>
{/snippet}

{#snippet genericChildren()}
    <TabTriggers/>
    <TabContent key="Tab1" label="Tab 1">{@render tabContent()}</TabContent>
    <TabContent key="Tab2" label="Tab 2">{@render tabContent()}</TabContent>
    <TabContent key="Tab3" label="Tab 3">{@render tabContent()}</TabContent>
{/snippet}

<Story name="Generic" args={{}}/>
<Story name="Preset Tab" args={{selected: 'Tab2'}}/>
<Story name="Icons" args={{}}>
    {#snippet children(args)}
        <Tabs {...args}>
            <TabTriggers/>
            <TabContent key="Tab1" label="Tab 1" labelIcon="star">{@render tabContent()}</TabContent>
            <TabContent key="Tab2" label="Tab 2" labelIcon="at">{@render tabContent()}</TabContent>
            <TabContent key="Tab3" label="Tab 3" labelIcon="filter">{@render tabContent()}</TabContent>
        </Tabs>
    {/snippet}
</Story>
<Story name="Block" args={{}}>
    {#snippet children(args)}
        <Tabs {...args}>
            <TabTriggers block/>
            <TabContent key="Tab1" label="Tab 1">{@render tabContent()}</TabContent>
            <TabContent key="Tab2" label="Tab 2">{@render tabContent()}</TabContent>
            <TabContent key="Tab3" label="Tab 3">{@render tabContent()}</TabContent>
        </Tabs>
    {/snippet}
</Story>
<Story name="Longer Tabs" args={{}}>
    {#snippet children(args)}
        <Tabs {...args}>
            <TabTriggers/>
            <TabContent key="Tab1" label="My first Tab">{@render tabContent()}</TabContent>
            <TabContent key="Tab2" label="Another tab with more words">{@render tabContent()}</TabContent>
            <TabContent key="Tab3" label="The last tab in the list"
                        disabled={disabled}>{@render tabContent()}</TabContent>
        </Tabs>
    {/snippet}
</Story>
<Story name="Disabled Tabs" args={{}} argTypes={{selected: {options: ['Tab1', 'Tab2', 'Tab3', 'Tab4']}}}>
    {#snippet children(args)}
        <Tabs {...args}>
            <TabTriggers/>
            <TabContent key="Tab1" label="Tab 1">{@render tabContent()}</TabContent>
            <TabContent key="Tab2" label="Tab 2">{@render tabContent()}</TabContent>
            <TabContent key="Tab3" label="Tab 3" disabled={disabled}>{@render tabContent()}</TabContent>
            <TabContent key="Tab4" label="Tab 4">{@render tabContent()}</TabContent>
        </Tabs>
        <br>
        <Button onclick={() => {disabled = !disabled}}>{disabled ? 'Enable Tab 3' : 'Disable Tab 3'}</Button>
    {/snippet}
</Story>
<Story name="Overflow" args={{}}>
    {#snippet children(args)}
        <Tabs {...args}>
            <div style="width: 200px; overflow: hidden">
                <TabTriggers block/>
                <TabContent key="Tab1" label="Tab 1">
                    <Typo>Content Pane 2</Typo>
                </TabContent>
                <TabContent key="Tab2" label="Tab 2">
                    <Typo>Content Pane 2</Typo>
                </TabContent>
                <TabContent key="Tab3" label="Tab 3">
                    <Typo>Content Pane 3</Typo>
                </TabContent>
                <TabContent key="Tab4" label="Tab 4">
                    <Typo>Content Pane 4</Typo>
                </TabContent>
                <TabContent key="Tab5" label="Tab 5">
                    <Typo>Content Pane 5</Typo>
                </TabContent>
                <TabContent key="Tab6" label="Tab 6">
                    <Typo>Content Pane 6</Typo>
                </TabContent>
                <TabContent key="Tab7" label="Tab 7">
                    <Typo>Content Pane 7</Typo>
                </TabContent>
            </div>
        </Tabs>
    {/snippet}
</Story>
