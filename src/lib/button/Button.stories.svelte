<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {fn} from 'storybook/test';
    import {Button, iconArgType} from '$lib';

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
    {#snippet template({size, disabled})}
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
    {#snippet template({size, disabled})}
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
    {#snippet template({size, disabled})}
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
    {#snippet template({size, disabled})}
        <div style="display: flex; flex-direction: column; gap: 20px">
            <Button size={size} link="http://www.hawk.de" type="link" linkTarget="_blank" disabled={disabled}>Label
            </Button>
            <Button size={size} link="http://www.hawk.de" type="link" linkTarget="_blank" icon="plus"
                    iconPosition="right"
                    disabled={disabled}>Label
            </Button>
            <Button size={size} link="http://www.hawk.de" type="link" linkTarget="_blank" icon="plus"
                    iconPosition="left"
                    disabled={disabled}>Label
            </Button>
            <Button size={size} link="http://www.hawk.de" type="link" icon="plus"
                    iconPosition="above"
                    disabled={disabled}>Label
            </Button>
            <Button size={size} link="http://www.hawk.de" type="link" icon="plus"
                    iconPosition="iconOnly"
                    disabled={disabled}>Label
            </Button>
        </div>
    {/snippet}
</Story>

<Story name="In Text Context" parameters="{{controls: {include: []}}}">
    <p style="color: purple !important; fill: purple !important;">
        The icon inside the button should be white, even if the text surrounding it is purple.
        <Button icon="eye" type="filled">Click me!</Button>
    </p>
</Story>

<Story name="Form Submit">
    <form on:submit|preventDefault={() => alert('Form submitted!')}>
        <Button type="outlined" onclick={fn()}>Not submitting</Button>
        <Button type="filled" submit>Submit</Button>
    </form>
</Story>
