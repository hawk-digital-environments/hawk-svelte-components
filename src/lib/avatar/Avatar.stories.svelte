<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Avatar from './Avatar.svelte';
    import {fn} from '@storybook/test';
    import {iconArgType} from '../icon/iconDefinition.js';
    import {mergeProps} from '../util/mergeProps.js';

    const {Story} = defineMeta({
        title: 'Handson/Avatar',
        component: Avatar,
        tags: ['autodocs'],
        argTypes: {
            actionIcon: iconArgType()
        },
        args: {
            src: 'https://picsum.photos/200'
        }
    });
</script>

<Story name="Generic" args={{}}/>
<Story name="Fallback" args={{src: undefined}}/>
<Story name="Name" args={{status: 'online'}} parameters={{controls: {exclude: ['name', 'showName', 'size']}}}>
    {#snippet children({name, ...args})}
        <div style="display: flex; gap: 20px">
            <Avatar name="Maximilian" {...args}/>
            <Avatar name="Max" showName={true} {...args}/>
            <Avatar name="Maximilian" showName={true} {...args}/>
            <Avatar name="Maximilian" onclick={() => void 0} showName={true} {...args}/>
        </div>
        <div style="display: flex; gap: 20px; margin-top: 20px">
            <Avatar name="Maximilian" size="small" {...args}/>
            <Avatar name="Max" size="small" showName={true} {...args}/>
            <Avatar name="Maximilian" size="small" showName={true} {...args}/>
            <Avatar name="Maximilian" onclick={() => void 0} size="small" showName={true} {...args}/>
        </div>
    {/snippet}
</Story>
<Story name="Clickable" args={{
    onclick: fn()
}}/>
<Story name="Action Icon" args={{
    actionIcon: 'minus',
    actionIconLabel: 'Benutzer entfernen',
    onactionclick: fn()
}}/>
<Story name="Online Status" args={{}} parameters={{controls: {exclude: ['status', 'size']}}}>
    {#snippet children(args)}
        <div style="display: flex; gap: 20px">
            <Avatar {...mergeProps(args, {status: 'online'})}/>
            <Avatar {...mergeProps(args, {status: 'offline'})}/>
        </div>
        <div style="display: flex; gap: 20px; margin-top: 20px">
            <Avatar {...mergeProps(args, {status: 'online', size: 'small'})}/>
            <Avatar {...mergeProps(args, {status: 'offline', size: 'small'})}/>
        </div>
    {/snippet}
</Story>
