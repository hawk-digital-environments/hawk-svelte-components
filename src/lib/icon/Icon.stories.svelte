<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Icon from './Icon.svelte';
    import {allowedIconNames} from './iconDefinition.js';

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const {Story} = defineMeta({
        title: 'Handson/Icon',
        component: Icon,
        tags: ['autodocs'],
        argTypes: {
            icon: {
                control: {type: 'select'},
                options: allowedIconNames
            },
            gradient: {
                control: {type: 'object'}
            }
        },
        args: {
            icon: 'eye'
        }
    });
</script>

<Story name="Generic" args={{ }}/>
<Story name="Gradient" args={{ gradient: ['var(--clr-gradient-start)', 'var(--clr-gradient-end)']}}/>
