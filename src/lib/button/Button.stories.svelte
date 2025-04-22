<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Button from './Button.svelte';
    import {fn} from '@storybook/test';
    import {iconArgType} from '$lib/icon/iconDefinition.ts';

    const {Story} = defineMeta({
        title: 'Handson/Button',
        component: Button,
        tags: ['autodocs'],
        argTypes: {
            icon: iconArgType()
        },
        args: {
            onclick: fn()
        }
    });
</script>

{#snippet label()}
    Label
{/snippet}

<Story name="Generic" args={{children: label}}/>

<Story name="Filled" args={{size: 'small', disabled: false}}
       parameters={{controls: {include: ['size', 'disabled']}}}>
    {#snippet children({size, disabled})}
        <div style="display: flex; flex-direction: column; gap: 20px">
            <Button size={size} disabled={disabled}>Label</Button>
            <Button size={size} icon="plus" iconPosition="right" disabled={disabled}>Label</Button>
            <Button size={size} icon="plus" iconPosition="left" disabled={disabled}>Label</Button>
            <Button size={size} icon="plus" iconPosition="above" disabled={disabled}>Label</Button>
            <Button size={size} icon="plus" iconPosition="iconOnly" disabled={disabled}>Label</Button>
        </div>
    {/snippet}
</Story>

<Story name="Outlined" args={{size: 'small', disabled: false}}
       parameters={{controls: {include: ['size', 'disabled']}}}>
    {#snippet children({size, disabled})}
        <div style="display: flex; flex-direction: column; gap: 20px">
            <Button size={size} type="outlined" disabled={disabled}>Label</Button>
            <Button size={size} type="outlined" icon="plus" iconPosition="right" disabled={disabled}>Label</Button>
            <Button size={size} type="outlined" icon="plus" iconPosition="left" disabled={disabled}>Label</Button>
            <Button size={size} type="outlined" icon="plus" iconPosition="above" disabled={disabled}>Label</Button>
            <Button size={size} type="outlined" icon="plus" iconPosition="iconOnly" disabled={disabled}>Label</Button>
        </div>
    {/snippet}
</Story>

<Story name="Text" args={{size: 'small', disabled: false}}
       parameters={{controls: {include: ['size', 'disabled']}}}>
    {#snippet children({size, disabled})}
        <div style="display: flex; flex-direction: column; gap: 20px">
            <Button size={size} type="text" disabled={disabled}>Label</Button>
            <Button size={size} type="text" icon="plus" iconPosition="right" disabled={disabled}>Label</Button>
            <Button size={size} type="text" icon="plus" iconPosition="left" disabled={disabled}>Label</Button>
            <Button size={size} type="text" icon="plus" iconPosition="above" disabled={disabled}>Label</Button>
            <Button size={size} type="text" icon="plus" iconPosition="iconOnly" disabled={disabled}>Label</Button>
        </div>
    {/snippet}
</Story>

<Story name="Link" args={{size: 'small', disabled: false}}
       parameters={{controls: {include: ['size', 'disabled']}}}>
    {#snippet children({size, disabled})}
        <div style="display: flex; flex-direction: column; gap: 20px">
            <Button size={size} link="http://www.hawk.de" linkTarget="_blank" disabled={disabled}>Label</Button>
            <Button size={size} link="http://www.hawk.de" linkTarget="_blank" icon="plus" iconPosition="right"
                    disabled={disabled}>Label
            </Button>
            <Button size={size} link="http://www.hawk.de" linkTarget="_blank" icon="plus" iconPosition="left"
                    disabled={disabled}>Label
            </Button>
            <Button size={size} link="http://www.hawk.de" linkTarget="_blank" icon="plus" iconPosition="above"
                    disabled={disabled}>Label
            </Button>
            <Button size={size} link="http://www.hawk.de" linkTarget="_blank" icon="plus" iconPosition="iconOnly"
                    disabled={disabled}>Label
            </Button>
        </div>
    {/snippet}
</Story>
