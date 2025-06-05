<script module>
  import {Card} from '$lib';
  import {defineMeta} from '@storybook/addon-svelte-csf';


  const {Story} = defineMeta({
    title: 'Handson/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {},
    args: {}
  });
</script>

<Story name="Generic" args={{}}>
  <Card>This is your cards content</Card>
</Story>

<Story name="Focused" args={{}}>
  <Card tabindex="{1}">This is your cards content</Card>
</Story>
