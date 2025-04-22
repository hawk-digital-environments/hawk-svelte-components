<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Switch from './Switch.svelte';
    import {fn} from '@storybook/test';
    import {iconArgType} from '../icon/iconDefinition.js';

    const {Story} = defineMeta({
        title: 'Handson/Switch',
        component: Switch,
        tags: ['autodocs'],
        argTypes: {
            label: {control: 'text'},
            labelPosition: {options: ['left', 'right'], control: 'radio'},
            iconOff: iconArgType(),
            iconOn: iconArgType()
        },
        args: {
            onchange: fn()
        }
    });
</script>

<Story name="Generic" args="{{}}"></Story>

{#snippet fancyLabel()}
    <strong>Hello</strong> world!
{/snippet}

<Story name="Variants" args="{{}}">
    {#snippet children(args)}
        <div style="display: flex; flex-wrap: wrap; gap: 0; max-width: 420px; gap: 20px">
            <div style="flex-basis: calc(50% - 20px); text-align: right">
                <Switch label="Label" checked labelPosition="left"/>
            </div>
            <div style="flex-basis: calc(50% - 20px)">
                <Switch label="Label" checked labelPosition="right"/>
            </div>
            <div style="flex-basis: calc(50% - 20px); text-align: right">
                <Switch label="Label" labelPosition="left"/>
            </div>
            <div style="flex-basis: calc(50% - 20px)">
                <Switch label="Label" labelPosition="right"/>
            </div>
            <div style="flex-basis: calc(50% - 20px); text-align: right">
                <Switch label="Label" labelPosition="left" required/>
            </div>
            <div style="flex-basis: calc(50% - 20px)">
                <Switch label="Label" labelPosition="right" required/>
            </div>
            <div style="flex-basis: calc(50% - 20px); text-align: right">
                <Switch checked labelPosition="left"/>
            </div>
            <div style="flex-basis: calc(50% - 20px)">
                <Switch checked labelPosition="right"/>
            </div>
            <div style="flex-basis: calc(50% - 20px); text-align: right">
                <Switch label={fancyLabel} checked labelPosition="left"/>
            </div>
            <div style="flex-basis: calc(50% - 20px)">
                <Switch label={fancyLabel} checked labelPosition="right"/>
            </div>
        </div>
    {/snippet}
</Story>
