<script lang="ts">
  import style from "./switch.module.css";
  import classNames from "classnames";

  interface Props {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    labelPosition?: "left" | "right";
  }

  const {
    checked = false,
    disabled = false,
    label = "Label",
    labelPosition = "left",
  }: Props = $props();

  const switchWrapperClasses = $derived(
    classNames(style.wrapper, {
      [style.wrapperLabelRight]: labelPosition === "right",
      [style.disabled]: disabled,
    }),
  );
</script>

<div class={switchWrapperClasses}>
  <label for="switch">{label}</label>
  <input type="checkbox" role="switch" id="switch" {checked} {disabled} />
</div>
