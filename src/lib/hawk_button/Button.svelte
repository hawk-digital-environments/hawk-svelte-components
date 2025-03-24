<script lang="ts">
  import type { Snippet } from "svelte";
  import style from "./button.module.css";
  import classNames from "classnames";

  interface Props {
    // does cool stuff with colors
    type?: "filled" | "outlined" | "text" | "link" | "raised";
    /** Hello World */
    size?: "small" | "large";
    label?: string;
    icon?: string;
    iconPosition?: "left" | "right" | "iconOnly";
    disabled: boolean;
    onClick?: () => void;
  }

  const {
    type = "filled",
    size = "small",
    label = "Button",
    icon = "+",
    iconPosition = "left",
    disabled = false,
    onClick,
  }: Props = $props();
</script>

<button
  type="button"
  class={classNames(style.button, {
    [style.sizeLarge]: size === "large",
    [style.sizeSmall]: size === "small",

    [style.typeFilled]: type === "filled",
    [style.typeOutlined]: type === "outlined",
    [style.typeText]: type === "text",
    [style.typeLink]: type === "link",
    [style.typeRaised]: type === "raised",

    [style.iconPositionLeft]: iconPosition === "left",
    [style.iconPositionRight]: iconPosition === "right",
    [style.iconOnly]: iconPosition === "iconOnly",

    [style.disabled]: disabled,
  })}
  onclick={onClick}
>
  <span class="icon">{icon}</span>
  <span class="label">{label}</span>
</button>
