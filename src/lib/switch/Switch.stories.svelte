<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Switch from "./Switch.svelte";
  import { fn } from "@storybook/test";

  const { Story } = defineMeta({
    title: "HAWK/Switch",
    component: Switch,
    tags: ["autodocs"],
    argTypes: {},
  });
</script>

<Story name="Primary" args={{}} />
