<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Input from './Input.svelte';
    import {iconArgType} from '../icon/iconDefinition.js';
    import {fn} from '@storybook/test';

    const {Story} = defineMeta({
        title: 'Handson/Input',
        component: Input,
        tags: ['autodocs'],
        argTypes: {
            label: {control: {type: 'text'}},
            error: {control: {type: 'text'}},
            description: {control: {type: 'text'}},
            iconLeft: iconArgType(),
            iconRight: iconArgType()
        },
        args: {
            onblur: fn(),
            onfocus: fn()
        }
    });

</script>

<Story name="Generic" args={{label: 'Label'}}/>
<Story name="Error" args={{error: 'This is an error', label: 'Label'}}/>
<Story name="Sizing" args={{iconLeft: 'externalLink', iconRight: 'star', required: true}}
       parameters={{controls: {exclude: ['label']}}}>
    {#snippet children({id, ...args})}
        <div style="width: 400px; display: flex; gap: 20px; flex-direction: column; margin-bottom: 20px">
            <Input {...args}
                   label="hello mit ganz vielen tollen Worten und Umbruch und noch mehr Wörtern und noch mehr anderen Wörtern um viele Zeilen zu testen"/>
            <Input {...args} label="hello mit ganz vielen tollen Worten und Umbruch und noch"/>
            <Input {...args} label="hello mit ganz vielen tollen Worten und Umbruch und noch"
                   required/>
            <Input {...args} label="hello"/>
        </div>
        <div style="width: 100%; display: flex; gap: 20px; flex-direction: column">
            <Input {...args}
                   label="hello mit ganz vielen tollen Worten und Umbruch und noch mehr Wörtern und noch mehr anderen Wörtern um viele Zeilen zu testen"/>
            <Input {...args} label="hello mit ganz vielen tollen Worten und Umbruch und noch"/>
            <Input {...args} label="hello mit ganz vielen tollen Worten und Umbruch und noch"
                   required/>
            <Input {...args} label="hello"/>
        </div>
    {/snippet}
</Story>

{#snippet inputDescription()}
    Description with <a href='#'>Link</a>
{/snippet}

<Story name="With Link In Description" args={{description: inputDescription, error: 'Mein Error!'}}/>
