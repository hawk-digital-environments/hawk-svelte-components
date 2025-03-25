<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "./Button.svelte";
  import { fn } from "@storybook/test";

  const { Story } = defineMeta({
    title: "HAWK/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {},
    args: {
      onClick: fn(),
    },
  });
</script>

<Story name="Primary" args={{}} />
