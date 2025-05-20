<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {allowedIconNames, iconArgType} from '$lib/icon/iconDefinition.js';
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
                description: 'The label of the info-item'
            },
            children: {
                control: 'text',
                description: 'The content of the info-item'
            },
        },
        args: {
            icon: 'eye',
            label: 'Label',
            children: 'Information text here'
        }
    });

</script>

<Story name="Generic" args={{ }}>
 
 

</Story>

<Story name="Component with snippet">   
    <InfoItem icon="eye" label="Label">
    Information text here
</InfoItem></Story>


