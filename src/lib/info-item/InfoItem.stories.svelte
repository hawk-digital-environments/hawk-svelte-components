<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {iconArgType} from '$lib/icon/iconDefinition.js';
    import {InfoItem} from '$lib';

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const {Story} = defineMeta({
        title: 'Handson/InfoItem',
        component: InfoItem,
        tags: ['autodocs'],
        argTypes: {
            icon: iconArgType(),
            label: {
                control: 'text',
            },
            children: {
                control: 'text',
            },
        },
        args: {
            icon: 'eye',
            label: 'Label',
            children: 'Information text here'
        }
    });
</script>
<script>
    import {Icon} from '$lib';
</script>

<Story name="Generic" args={{ }}/>

{#snippet myLabel()}
    <Icon icon="eye" size="small"/>
    My label
{/snippet}
{#snippet myChildren(label)}
    <strong><a href="https://example.com">{label ?? 'kein label'}</a></strong>
{/snippet}

<Story name="Component with snippet">
    {#snippet children(args)}
        <InfoItem icon={args.icon} label="{args.label}"><strong>{args.children}</strong></InfoItem>
        <InfoItem icon={args.icon} label="Label 2" children={myChildren}></InfoItem>
        <InfoItem icon={args.icon} label={myLabel}></InfoItem>
        <InfoItem icon={args.icon}>
            {#snippet children()}
                <strong>My children</strong>
            {/snippet}
            {#snippet label()}
                <Icon icon="eye" size="small"/>
                My label
            {/snippet}
        </InfoItem>
    {/snippet}
</Story>
