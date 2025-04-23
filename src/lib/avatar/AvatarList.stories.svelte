<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import AvatarList from './AvatarList.svelte';
    import {fn} from '@storybook/test';

    const {Story} = defineMeta({
        title: 'Handson/AvatarList',
        component: AvatarList,
        tags: ['autodocs'],
        argTypes: {},
        args: {
            avatars: [
                {
                    src: 'https://picsum.photos/200',
                    name: 'Max',
                    status: 'online'
                },
                {
                    src: 'https://picsum.photos/200?q=1',
                    name: 'Paulina',
                    status: 'online'
                },
                {
                    src: 'https://picsum.photos/200?q=2',
                    name: 'Thomas',
                    status: 'offline'
                },
                {
                    src: 'https://picsum.photos/200?q=3',
                    name: 'Mareike'
                },
                {
                    src: 'https://picsum.photos/200?q=4',
                    name: 'Frauke'
                }
            ]
        }
    });
</script>

<Story name="Generic" args={{}}/>
<Story name="Small" args={{size: 'small'}}/>
<Story name="More" args={{more: 5, onmoreclick: fn(), moreLabel: 'There are more avatars'}}/>
