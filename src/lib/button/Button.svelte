<script lang="ts">
  import style from "./button.module.css";
  import classNames from "classnames";

  interface Props {
    // does cool stuff with colors
    type?: "filled" | "outlined" | "text" | "link" | "raised";
    /** Hello World */
    size?: "small" | "large";
    label?: string;
    icon?: string;
    iconPosition?: "left" | "right";
    iconOnly?: boolean;
    link?: string;
    linkTarget?: string;
    disabled: boolean;
    onClick?: () => void;
  }

  const {
    type = "filled",
    size = "small",
    label = "Button",
    icon = "+",
    iconPosition = "left",
    iconOnly = false,
    link = "",
    linkTarget = "_blank",
    disabled = false,
    onClick,
  }: Props = $props();

  const buttonClasses = $derived(
    classNames(style.button, {
      [style.sizeLarge]: size === "large",
      [style.sizeSmall]: size === "small",

      [style.typeFilled]: type === "filled",
      [style.typeOutlined]: type === "outlined",
      [style.typeText]: type === "text",
      [style.typeLink]: type === "link",
      [style.typeRaised]: type === "raised",

      [style.iconPositionLeft]: iconPosition === "left",
      [style.iconPositionRight]: iconPosition === "right",
      [style.iconOnly]: iconOnly,

      [style.disabled]: disabled,
    }),
  );
</script>

{#if link}
  <a href={link} target={linkTarget} class={buttonClasses}>
    <span class="icon">{icon}</span>
    <span class="label">{label}</span>
  </a>
{:else}
  <button type="button" class={buttonClasses} {disabled} onclick={onClick}>
    <span class="icon">{icon}</span>
    <span class="label">{label}</span>
  </button>
{/if}
