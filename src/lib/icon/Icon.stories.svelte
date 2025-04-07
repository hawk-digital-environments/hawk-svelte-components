<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Icon from './Icon.svelte';
    import {allowedIconNames, iconArgType} from '$lib/icon/iconDefinition.js';

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const {Story} = defineMeta({
        title: 'Handson/Icon',
        component: Icon,
        tags: ['autodocs'],
        argTypes: {
            icon: iconArgType(),
            gradient: {
                control: {type: 'select', labels: {default: 'Default', redGreen: '["red", "green"]'}},
                options: ['none', 'default', 'redGreen'],
                mapping: {
                    none: null,
                    default: 'default',
                    redGreen: ['red', 'green']
                }
            }
        },
        args: {
            icon: 'eye'
        }
    });

</script>

<Story name="Generic" args={{ }}/>
<Story name="Gradient" args={{ gradient: 'default'}}/>
<Story name="All Icons" parameters={{controls: {include: ['size', 'disabled']}}}>
    {#snippet children(args)}
        <div style="display: flex; max-width: 100%; width: 600px; gap: 20px; flex-wrap: wrap">
            {#each allowedIconNames as iconName}
                <div>
                    <Icon icon={iconName} size={args.size}/>
                </div>
            {/each}
        </div>
    {/snippet}
</Story>
