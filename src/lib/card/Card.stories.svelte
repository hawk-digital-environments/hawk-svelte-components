<script module>
  import {fn} from '@storybook/test';
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

{#snippet content()}
  This is your cards content
{/snippet}
<Story name="Generic" args={{children: content}}/>
<Story name="Disabled" args={{disabled: true, link: 'https://hawk.de', linkTarget: '_blank', children: content}}/>
<Story name="Info Action"
       args={{
         oninfoclick: fn(),
         infoTitle: 'Get more information',
         children: content,
         // Also enable the link, to check if the info icon does not interfere with it
         link: 'https://hawk.de',
         linkTarget: '_blank'}}/>
<Story name="Info Text" args={{infoText: '11:33 Uhr', children: content}}/>
<Story name="Count" args={{count: 3, countTitle: 'Zahl der neuen Beiträge', children: content}}/>

{#snippet linkCardContent()}
  You can assign a link to a card, which will make it clickable and focusable like a button.
{/snippet}
<Story name="Link" args={{children: linkCardContent, link: 'https://hawk.de', linkTarget: '_blank'}}/>

{#snippet jsActionCardContent()}
  You can also assign an "onclick" handler to a card, which will be called when the card is clicked.<br/>
  Also the <code>ENTER</code> and <code>SPACE</code> keys will trigger the onclick handler, like on a button.
{/snippet}
<Story name="JS Action" args={{children: jsActionCardContent, onclick: fn()}}/>
