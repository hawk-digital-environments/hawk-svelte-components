<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {fn} from '@storybook/test';
    import {Chip, iconArgType} from '$lib';

    const {Story} = defineMeta({
        title: 'Handson/Chip',
        component: Chip,
        tags: ['autodocs'],
        argTypes: {
            label: {control: {type: 'text'}},
            icon: iconArgType()
        },
        args: {}
    });
</script>
<script>
    import {ChipList} from '$lib';
</script>

<Story name="Generic" args={{label: 'Label'}}/>
<Story name="Long Label"
       args={{
           label: 'Label mit richtig vielen Wörtern die schön überlaufen und trotzdem gut aussehen sollten.',
           icon: 'eye',
           onaddclick: fn()
       }}>
    {#snippet children(args)}
        <Chip {...args}/>
        <div style="width: 400px; display: flex; gap: 20px; flex-direction: column; margin-bottom: 20px; margin-top: 20px">
            <Chip {...args}/>
        </div>
        <div style="width: 200px; display: flex; gap: 20px; flex-direction: column; margin-bottom: 20px; margin-top: 20px">
            <Chip {...args}/>
        </div>
        <div style="width: 300px; display: flex; gap: 20px; flex-direction: column; margin-bottom: 20px; margin-top: 20px">
            <ChipList
                    chips={[{label: 'Hello World'}, {label: 'Before the long one', icon: 'close'}, args, {label: 'Fortschritt!'}]}/>
        </div>
    {/snippet}
</Story>
<Story name="Addable" args={{label: 'Label', onaddclick: fn()}}/>
<Story name="Removable" args={{label: 'Label', onremoveclick: fn()}}/>
