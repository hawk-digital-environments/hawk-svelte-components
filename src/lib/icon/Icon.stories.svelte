<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Icon from './Icon.svelte';
    import {allowedIconNames} from './iconDefinition.js';

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const {Story} = defineMeta({
        title: 'Example/Icon',
        component: Icon,
        tags: ['autodocs'],
        argTypes: {
            icon: {
                control: {type: 'select'},
                options: allowedIconNames
            }
        },
        args: {
            icon: 'eye'
        }
    });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ }}/>
