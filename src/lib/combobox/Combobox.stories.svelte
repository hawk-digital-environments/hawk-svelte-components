<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {Combobox, iconArgType} from '$lib';

    const {Story} = defineMeta({
        title: 'Handson/Combobox',
        component: Combobox,
        tags: ['autodocs'],
        argTypes: {
            label: {control: {type: 'text'}},
            error: {control: {type: 'text'}},
            description: {control: {type: 'text'}},
            iconLeft: iconArgType(),
            iconRight: iconArgType()
        },
        args: {
            label: 'Label',
            options: [
                {value: 'apple', label: 'Apfel 🍎'},
                {value: 'peach', label: 'Pfirsich 🍑'},
                {value: 'potato', label: 'Kartoffel 🥔'},
                {value: 'pear', label: 'Birne 🍐', disabled: true},
                {value: 'grapes', label: 'Traube 🍇'},
                {value: 'banana', label: 'Banane 🍌'},
                {value: 'kiwi', label: 'Kiwi 🥝'},
                {value: 'pineapple', label: 'Ananas 🍍'},
                {value: 'orange', label: 'Orange 🍊'},
                {value: 'lemon', label: 'Lime 🍋'}
            ]
        }
    });
</script>
<script>
    import {mergeProps} from '$lib/util/mergeProps.js';
</script>

<Story name="Generic"/>
<Story name="Placeholder" args={{placeholder: 'Select a value'}}/>
<Story name="Filtered"
       args={{
           label: 'Filtered Values',
           description: 'If "Apfel" is selected, only "Ananas and Kiwi" can be selected',
           filter: (options, values) => {
                if(values.includes('apple')) {
                    return options.filter(option => ['banana', 'kiwi'].includes(option.value));
                }

                return options;
            }
       }}
       parameters={{controls: {disabled: true}}}/>

<Story name="Async Filtered"
       args={{
           label: 'Filtered Values',
           description: 'If "Pfirsich" is selected, only "Apfel and Orange" can be selected',
           filter: (options, values, onCancel) => {
               return new Promise(resolve => {
                   // Simulate an async delay
                    const timeout = setTimeout(() => {
                        if(values.includes('peach')) {
                            resolve(options.filter(option => ['apple', 'orange'].concat(...values).includes(option.value)));
                            return;
                        }

                        resolve(options);
                    }, 500);
                    onCancel(() => clearTimeout(timeout));
               })
            }
       }}
       parameters={{controls: {disabled: true}}}/>

<Story name="Sizing" args={{iconLeft: 'externalLink', iconRight: 'star', required: true}}
       parameters={{controls: {exclude: ['label', 'value']}}}>
    {#snippet children({id, value, ...args})}
        <div style="width: 400px; display: flex; gap: 20px; flex-direction: column; margin-bottom: 20px">
            <Combobox {...mergeProps(
                args,
                {value: ['apple', 'peach', 'potato', 'banana', 'kiwi', 'pineapple', 'orange', 'lemon']}
            )}/>
        </div>
        <div style="width: 100%; display: flex; gap: 20px; flex-direction: column">
            <Combobox {...mergeProps(
                args,
                {value: ['apple', 'peach', 'potato', 'banana', 'kiwi', 'pineapple', 'orange', 'lemon']}
            )}/>
        </div>
    {/snippet}
</Story>
