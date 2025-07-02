<script module>
  import { fn } from "@storybook/test";
  import { Card } from "$lib";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Typo from "$lib/typo/Typo.svelte";

  const { Story } = defineMeta({
    title: "Handson/Card",
    component: Card,
    tags: ["autodocs"],
    argTypes: {},
    args: {},
  });
</script>

{#snippet content()}
  This is your cards content
{/snippet}

{#snippet details()}
  <h3>Details Headline</h3>
  This is your cards details
{/snippet}
<Story name="Generic" args={{ children: content, details: details }} />
<Story
  name="Disabled"
  args={{
    disabled: true,
    link: "https://hawk.de",
    linkTarget: "_blank",
    children: content,
  }}
/>

{#snippet linkCardContent()}
  You can assign a link to a card, which will make it clickable and focusable
  like a button.
{/snippet}
<Story
  name="Link"
  args={{
    children: linkCardContent,
    link: "https://hawk.de",
    linkTarget: "_blank",
  }}
/>

{#snippet jsActionCardContent()}
  You can also assign an "onclick" handler to a card, which will be called when
  the card is clicked.<br />
  Also the <code>ENTER</code> and <code>SPACE</code> keys will trigger the onclick
  handler, like on a button.
{/snippet}
<Story
  name="JS Action"
  args={{ children: jsActionCardContent, onclick: fn() }}
/>
